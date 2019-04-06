/**
 * @fileoverview Flag if the handler does not call `next()` in a Restify handler
 * @author Rajat Kumar
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require('requireindex');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
//eslint-disable-next-line no-path-concat
module.exports.rules = requireIndex(__dirname + '/rules');
