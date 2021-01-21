'use strict';

const conventionalChangelog = require('gulp-conventional-changelog');
const del = require('del');
const exec = require('./gulp/exec');
const fs = require('fs');
const git = require('gulp-git');
const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const minimist = require('minimist');
const ts = require('gulp-typescript');
const tslint = require('gulp-tslint');
const filter = require('gulp-filter');

const options = minimist(process.argv.slice(2), {strings: ['type']});
const tsProjectBuildOutput = ts.createProject('tsconfig.json', {noEmit: false});
const specHelperPath = 'build-output/test/support/spec-helper.js';
const unitTests = 'build-output/test/unit/**/*.spec.js';
const e2eTests = 'build-output/test/e2e/**/*.spec.js';

const utilities = {
    compileBuildOutput: function () {
        const tsResult = tsProjectBuildOutput.src().pipe(tsProjectBuildOutput());
        return tsResult.js.pipe(gulp.dest('build-output'));
    },
    getBumpType: function() {
        const validTypes = ['major', 'minor', 'patch', 'prerelease'];
        if (validTypes.indexOf(options.type) === -1) {
            throw new Error(
                `You must specify a release type as one of (${validTypes.join(', ')}), e.g. "--type minor"`
            );
        }
        return options.type;
    },
    getPackageJsonVersion: function() {
        return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
    }
};

function bumpVersion() {
    return exec(`npm version ${utilities.getBumpType()} --no-git-tag-version`);
}

function changelog() {
    return gulp.src('CHANGELOG.md')
        .pipe(conventionalChangelog({preset: 'angular'}))
        .pipe(gulp.dest('./'));
}

function cleanBuildOutput() {
    return del(['build-output/**/*.js']);
}

function copyBuildOutputPackageJson() {
    return gulp.src('package.json').pipe(gulp.dest('build-output'))
}

function compileBuildOutput() {
    return utilities.compileBuildOutput();
}

function compileAndUnitTest() {
    return utilities.compileBuildOutput()
        .pipe(filter([specHelperPath, unitTests]))
        .pipe(jasmine({includeStackTrace: true}));
}

function compileDist() {
    const tsProjectDist = ts.createProject('tsconfig.json', {noEmit: false});
    const tsResult = gulp.src('lib/**/*.ts').pipe(tsProjectDist());
    return tsResult.js.pipe(gulp.dest('dist'));
}

function cleanDist() {
    return del(['dist/*']);
}

function copyDistApiTypes() {
    return gulp.src('lib/api-types.d.ts').pipe(gulp.dest('dist'));
}

function commitChanges() {
    return gulp.src('.')
        .pipe(git.add())
        .pipe(git.commit(`chore: release ${utilities.getPackageJsonVersion()}`));
}

function createNewTag(callback) {
    const version = utilities.getPackageJsonVersion();
    git.tag(version, `Created Tag for version: ${version}`, callback);
}

function lintCommits() {
    return exec('./node_modules/.bin/commitlint --from=HEAD~20');
}

function lintTypeScript() {
    return tsProjectBuildOutput.src()
        .pipe(tslint())
        .pipe(tslint.report());
}

function npmPublish() {
    return exec('npm publish');
}

function pushChanges(callback) {
    git.push('origin', 'master', {args: '--tags'}, callback);
}

function e2eTest() {
    return gulp.src([specHelperPath, e2eTests])
        .pipe(jasmine({includeStackTrace: true}))
}

function test() {
    return gulp.src([specHelperPath, e2eTests, unitTests])
        .pipe(jasmine({includeStackTrace: true}))
}

function watchAndRunUnitTests() {
    gulp.watch(['lib/**/*.ts', 'test/**/*.ts'], gulp.series(compileAndUnitTest));
}

const cleanCopyAndCompileBuildOutput = gulp.series(
    cleanBuildOutput,
    gulp.parallel(copyBuildOutputPackageJson, compileBuildOutput)
);

exports.default = gulp.series(
    gulp.parallel(cleanCopyAndCompileBuildOutput, lintCommits),
    gulp.parallel(lintTypeScript, test)
);

exports.release = gulp.series(
    exports.default,
    cleanDist,
    compileDist,
    copyDistApiTypes,
    bumpVersion,
    changelog,
    commitChanges,
    createNewTag,
    pushChanges,
    npmPublish
);

exports.watch = gulp.series(
    cleanCopyAndCompileBuildOutput,
    watchAndRunUnitTests
);

exports.watchE2e = function () {
    gulp.watch(['build-output/lib/**/*', 'build-output/test/e2e/**/*', 'test/e2e/**/*.json'], gulp.series(e2eTest));
};

exports.build = compileDist
