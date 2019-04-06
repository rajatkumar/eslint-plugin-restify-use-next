# eslint-plugin-restify-use-next

[![NPM Version](https://img.shields.io/npm/v/eslint-plugin-restify-use-next.svg)](https://npmjs.org/package/eslint-plugin-restify-use-next)
[![Build Status](https://travis-ci.org/rajatkumar/eslint-plugin-restify-use-next.svg?branch=master)](https://travis-ci.org/rajatkumar/eslint-plugin-restify-use-next)
[![Coverage Status](https://coveralls.io/repos/github/rajatkumar/eslint-plugin-restify-use-next/badge.svg?branch=master)](https://coveralls.io/github/rajatkumar/eslint-plugin-restify-use-next?branch=master)
[![Dependency Status](https://david-dm.org/rajatkumar/eslint-plugin-restify-use-next.svg)](https://david-dm.org/rajatkumar/eslint-plugin-restify-use-next)
[![devDependency Status](https://david-dm.org/rajatkumar/eslint-plugin-restify-use-next/dev-status.svg)](https://david-dm.org/rajatkumar/eslint-plugin-restify-use-next#info=devDependencies)

> eslint plugin to check if you call `next()` in your restify handler 🎉

## 🤷 What

This rule enables you to verify that you are calling `next()` in your restify handlers.

Not calling `next()` has been a common mistake. Restify is different, and you have to call `next()` to your handler chains to work properly.

## Getting Started

Install the module with: `npm install eslint-plugin-restify-use-next --save-dev`

## Usage

Add to your existing eslint config file the following:

```
    plugins: ['restify-use-next'],
    rules: {
        'restify-use-next/restify-use-next': 2
    }
```

## API

See [API](/api.md)

## Contributing

Ensure that all linting and codestyle tasks are passing. Add unit tests for any
new or changed functionality.

To start contributing, install the git prepush hooks:

```sh
make githooks
```

Before committing, lint and test your code using the included Makefile:

```sh
make prepush
```

## License

Copyright (c) 2019 Rajat Kumar

Licensed under the MIT license.
