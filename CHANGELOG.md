<a name="0.23.4"></a>
## [0.23.4](https://bitbucket.org/atlassian/openapi-diff/compare/0.23.3...0.23.4) (2020-11-13)


### Chores

* **deps:** update node.js to v14 ([b573373](https://bitbucket.org/atlassian/openapi-diff/commits/b573373))


### BREAKING CHANGES

* **deps:** Dropped support for node.js v8. Migrate to NodeJS v10 or above.



<a name="0.23.3"></a>
## [0.23.3](https://bitbucket.org/atlassian/openapi-diff/compare/0.23.2...0.23.3) (2020-08-14)


### Bug Fixes

* bump json-schema-diff to the latest version to include bug fixes ([534e0c5](https://bitbucket.org/atlassian/openapi-diff/commits/534e0c5))



<a name="0.23.2"></a>
## [0.23.2](https://bitbucket.org/atlassian/openapi-diff/compare/0.23.1...0.23.2) (2020-07-14)


### Features

* bump swagger-parser to 10.x ([915b407](https://bitbucket.org/atlassian/openapi-diff/commits/915b407)), closes [#12](https://bitbucket.org/atlassian/openapi-diff/issue/12)



<a name="0.23.1"></a>
## [0.23.1](https://bitbucket.org/atlassian/openapi-diff/compare/0.23.0...0.23.1) (2020-01-28)



<a name="0.23.0"></a>
# [0.23.0](https://bitbucket.org/atlassian/openapi-diff/compare/0.22.0...0.23.0) (2019-08-02)


### Features

* update supported node versions, migrate to use swagger-parser v8.0.0 and general bumps ([6007c86](https://bitbucket.org/atlassian/openapi-diff/commits/6007c86))


### BREAKING CHANGES

* There are two breaking changes in this release:

1) nodejs 6.x is not supported anymore

To migrate from older versions, please start using nodejs 8.x or above.

2) `swagger-parser` v8.0.0 is now used, which enforces specs to follow the official JSON Schemas for Swagger2 and OpenApi3

This change might cause errors where `swagger-parser` complains about specs being invalid.
To migrate from older versions, please address any validation errors returned by this library.
More information about this can be found here:
  https://github.com/APIDevTools/swagger-parser/blob/master/CHANGELOG.md



<a name="0.22.0"></a>
# [0.22.0](https://bitbucket.org/atlassian/openapi-diff/compare/0.21.0...0.22.0) (2019-04-09)


### Features

* add support for minItems,  maxItems, minProperties, maxProperties and allOf keywords in request and response bodies ([96987f8](https://bitbucket.org/atlassian/openapi-diff/commits/96987f8))



<a name="0.21.0"></a>
# [0.21.0](https://bitbucket.org/atlassian/openapi-diff/compare/0.20.0...0.21.0) (2019-02-28)


### Features

* add support for the items keyword in request and response body schemas ([8636fa3](https://bitbucket.org/atlassian/openapi-diff/commits/8636fa3))



<a name="0.20.0"></a>
# [0.20.0](https://bitbucket.org/atlassian/openapi-diff/compare/0.19.0...0.20.0) (2019-02-07)


### Features

* add support for the required keyword in request and response body schemas ([ecc0e48](https://bitbucket.org/atlassian/openapi-diff/commits/ecc0e48))



<a name="0.19.0"></a>
# [0.19.0](https://bitbucket.org/atlassian/openapi-diff/compare/0.18.0...0.19.0) (2019-01-04)



<a name="0.18.0"></a>
# [0.18.0](https://bitbucket.org/atlassian/openapi-diff/compare/0.17.0...0.18.0) (2018-11-23)


### Features

* support required property in response headers ([9c09292](https://bitbucket.org/atlassian/openapi-diff/commits/9c09292))



<a name="0.17.0"></a>
# [0.17.0](https://bitbucket.org/atlassian/openapi-diff/compare/0.16.0...0.17.0) (2018-11-13)



<a name="0.16.0"></a>
# [0.16.0](https://bitbucket.org/atlassian/openapi-diff/compare/0.15.0...0.16.0) (2018-10-17)


### Features

* add support for diffing added and removed response headers ([1bfd09c](https://bitbucket.org/atlassian/openapi-diff/commits/1bfd09c))



<a name="0.15.0"></a>
# [0.15.0](https://bitbucket.org/atlassian/openapi-diff/compare/0.14.0...0.15.0) (2018-10-08)


### Features

* support finding differences in response bodies schemas ([f1b0cc9](https://bitbucket.org/atlassian/openapi-diff/commits/f1b0cc9))



<a name="0.14.0"></a>
# [0.14.0](https://bitbucket.org/atlassian/openapi-diff/compare/0.13.1...0.14.0) (2018-09-19)


### Bug Fixes

* fixed race condition in the watch loop for unit tests ([1d8b706](https://bitbucket.org/atlassian/openapi-diff/commits/1d8b706))


### Features

* add support for response status codes ([cb3bb13](https://bitbucket.org/atlassian/openapi-diff/commits/cb3bb13))



<a name="0.13.1"></a>
## [0.13.1](https://bitbucket.org/atlassian/openapi-diff/compare/0.13.0...0.13.1) (2018-08-29)


### Bug Fixes

* pin swagger-parser to avoid breaking changes when validation logic is changed ([eb3a0fd](https://bitbucket.org/atlassian/openapi-diff/commits/eb3a0fd))



<a name="0.13.0"></a>
# [0.13.0](https://bitbucket.org/atlassian/openapi-diff/compare/0.12.0...0.13.0) (2018-08-10)


### Features

* accept spec formats in programmatic API ([6389a57](https://bitbucket.org/atlassian/openapi-diff/commits/6389a57))



<a name="0.12.0"></a>
# [0.12.0](https://bitbucket.org/atlassian/openapi-diff/compare/0.11.0...0.12.0) (2018-07-18)


### Features

* add support for request bodies ([5f897d4](https://bitbucket.org/atlassian/openapi-diff/commits/5f897d4))



<a name="0.11.0"></a>
# [0.11.0](https://bitbucket.org/atlassian/openapi-diff/compare/0.10.0...0.11.0) (2018-07-06)


### Features

* add support for methods ([a1ad740](https://bitbucket.org/atlassian/openapi-diff/commits/a1ad740))



<a name="0.10.0"></a>
# [0.10.0](https://bitbucket.org/atlassian/openapi-diff/compare/0.9.0...0.10.0) (2018-07-03)


### Features

* add support for paths, remove support for schemes, basePath and host ([350993a](https://bitbucket.org/atlassian/openapi-diff/commits/350993a))



<a name="0.9.0"></a>
# [0.9.0](https://bitbucket.org/atlassian/openapi-diff/compare/0.8.1...0.9.0) (2018-07-02)


### Features

* added validation for swagger 2 specs ([406f00a](https://bitbucket.org/atlassian/openapi-diff/commits/406f00a))
* introduced openapi diff error with error code to node api ([1c717bf](https://bitbucket.org/atlassian/openapi-diff/commits/1c717bf))



<a name="0.8.1"></a>
## [0.8.1](https://bitbucket.org/atlassian/openapi-diff/compare/0.8.0...0.8.1) (2018-06-26)


### Bug Fixes

* fix equal comparison for complex x-properties values ([4a5a823](https://bitbucket.org/atlassian/openapi-diff/commits/4a5a823))


### Features

* removed support for info, host and version properties ([9f3a8a3](https://bitbucket.org/atlassian/openapi-diff/commits/9f3a8a3))



<a name="0.8.0"></a>
# [0.8.0](https://bitbucket.org/atlassian/openapi-diff/compare/0.7.2...0.8.0) (2018-06-07)


### Features

* changed the public api to accept specs as strings instead of objects ([387abaf](https://bitbucket.org/atlassian/openapi-diff/commits/387abaf))



<a name="0.7.2"></a>
## [0.7.2](https://bitbucket.org/atlassian/openapi-diff/compare/0.7.1...0.7.2) (2018-06-04)


### Bug Fixes

* include bin folder in published module ([e512194](https://bitbucket.org/atlassian/openapi-diff/commits/e512194))



<a name="0.7.1"></a>
## [0.7.1](https://bitbucket.org/atlassian/openapi-diff/compare/0.7.0...0.7.1) (2018-06-04)


### Bug Fixes

* fixed the content of the published module ([1caa103](https://bitbucket.org/atlassian/openapi-diff/commits/1caa103))



<a name="0.7.0"></a>
# [0.7.0](https://bitbucket.org/atlassian/openapi-diff/compare/0.6.1...0.7.0) (2018-06-04)


### Features

* added public programatic API ([c327308](https://bitbucket.org/atlassian/openapi-diff/commits/c327308))
* change api to expose breaking, non-breaking and unclassified differences ([2f6fbfe](https://bitbucket.org/atlassian/openapi-diff/commits/2f6fbfe))



<a name="0.6.1"></a>
## [0.6.1](https://bitbucket.org/atlassian/openapi-diff/compare/0.6.0...0.6.1) (2018-01-23)



<a name="0.6.0"></a>
# [0.6.0](https://bitbucket.org/atlassian/openapi-diff/compare/0.5.0...0.6.0) (2018-01-23)


### Features

* **core:** Load specs from YAML sources ([6d0f5e4](https://bitbucket.org/atlassian/openapi-diff/commits/6d0f5e4))


### Reverts

* unbump changelog dependencies for ci health ([18ae0d8](https://bitbucket.org/atlassian/openapi-diff/commits/18ae0d8))



<a name="0.5.0"></a>
# [0.5.0](https://bitbucket.org/atlassian/openapi-diff/compare/0.4.0...0.5.0) (2017-08-17)


### Features

* support to add/edit/delete Swagger 2's schemes property ([b0a4634](https://bitbucket.org/atlassian/openapi-diff/commits/b0a4634))



<a name="0.4.0"></a>
# [0.4.0](https://bitbucket.org/atlassian/openapi-diff/compare/0.3.0...v0.4.0) (2017-08-01)


### Features

* support to add/edit/delete of Swagger 2's host and basePath props ([d8da76d](https://bitbucket.org/atlassian/openapi-diff/commits/d8da76d))



<a name="0.3.0"></a>
# [0.3.0](https://bitbucket.org/atlassian/openapi-diff/compare/0.2.0...v0.3.0) (2017-07-26)


### Features

* support for editions to the openapi / swagger property ([a8c2fc7](https://bitbucket.org/atlassian/openapi-diff/commits/a8c2fc7))



<a name="0.2.0"></a>
# [0.2.0](https://bitbucket.org/atlassian/openapi-diff/compare/0.1.0...v0.2.0) (2017-07-19)


### Features

* support specs in url format ([11a0396](https://bitbucket.org/atlassian/openapi-diff/commits/11a0396))



<a name="0.1.0"></a>
# [0.1.0](https://bitbucket.org/atlassian/openapi-diff/compare/0.0.1...v0.1.0) (2017-07-07)


### Features

* support for editions to the info object and ^x- properties ([8464ac6](https://bitbucket.org/atlassian/openapi-diff/commits/8464ac6))



<a name="0.0.1"></a>
## 0.0.1 (2017-06-22)


### Features

* say 'hello world!' from OpenAPI-diff :) ([fda73c8](https://bitbucket.org/atlassian/openapi-diff/commits/fda73c8))



