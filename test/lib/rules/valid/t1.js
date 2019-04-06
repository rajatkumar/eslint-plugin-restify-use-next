'use strict';
var _ = require('lodash');

function route1(req, res, next) {
    res.send(200, {
        health: 'ok',
        timestamp: Date.now()
    });
    next();
}
