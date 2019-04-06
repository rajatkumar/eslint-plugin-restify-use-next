'use strict';
var restify = require('restify');
var server = restify.createServer();

function respond(req, res, next) {
    res.send('hello ' + req.params.name);
    next();
    // next is called, this will not be flagged
}

function respondWithoutNext(req, res, next) {
    res.send('hello ' + req.params.name);
    // no next, this will be flagged by the rule
}

function respondWithoutNextAgain(req, res, next) {
    res.send('hello ' + req.params.name);
    return proceedNext();
    // no next, this will be flagged by the rule
}

function passNextToAfn(req, res, next) {
    res.send('hello ' + req.params.name);
    return proceedNext(next);
    // next is being passed to a different fn
    // this will NOT be flagged by the rule
}

function proceedNext(next) {
    return next();
}

server.get('/hello/:name', respond);
server.get('/bad/:name', respondWithoutNext);
server.get('/bad2/:name', respondWithoutNextAgain);
server.get('/good/:name', passNextToAfn);

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
