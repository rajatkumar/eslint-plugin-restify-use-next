'use strict';
const fs = require('fs');
const path = require('path');
const rule = require('../../../lib/rules/restify-use-next'),
    RuleTester = require('eslint').RuleTester;

// Allow it to work with latest ECMAScript
RuleTester.setDefaultConfig({
    parserOptions: {
        ecmaVersion: 8
    }
});
// rule tester, provided by eslint
const ruleTester = new RuleTester();

// read the test files and return the source
const testFileReader = (type = 'valid', fileName) => {
    return fs.readFileSync(path.join(__dirname, type, fileName), 'utf-8');
};

// For every test, read the files, and return the object
// that RuleTester can work with
const testCaseGenerator = (type, name, error, output) => {
    const code = testFileReader(type, name);
    return {
        code,
        output: output || code,
        options: name ? [{ name }] : [],
        errors: error || [{ ruleId: 'restify-use-next' }]
    };
};

// Run the actual tests
ruleTester.run('restify-use-next', rule, {
    valid: [
        testCaseGenerator('valid', 't1.js'),
        testCaseGenerator('valid', 't2.js'),
        testCaseGenerator('valid', 't3.js'),
        testCaseGenerator('valid', 't4.js'),
        testCaseGenerator('valid', 't5.js'),
        testCaseGenerator('valid', 't6.js'),
        testCaseGenerator('valid', 't7.js'),
        testCaseGenerator('valid', 't8.js'),
        testCaseGenerator('valid', 't9.js'),
        testCaseGenerator('valid', 't10.js'),
        testCaseGenerator('valid', 't11.js'),
        testCaseGenerator('valid', 't12.js')
    ],

    invalid: [
        testCaseGenerator('invalid', 't1.js'),
        testCaseGenerator('invalid', 't2.js'),
        testCaseGenerator('invalid', 't3.js'),
        testCaseGenerator('invalid', 't4.js'),
        testCaseGenerator('invalid', 't5.js'),
        testCaseGenerator('invalid', 't6.js'),
        testCaseGenerator('invalid', 't7.js'),
        testCaseGenerator('invalid', 't8.js'),
        testCaseGenerator('invalid', 't9.js'),
        testCaseGenerator('invalid', 't10.js'),
        testCaseGenerator('invalid', 't11.js'),
        testCaseGenerator('invalid', 't12.js')
    ]
});
