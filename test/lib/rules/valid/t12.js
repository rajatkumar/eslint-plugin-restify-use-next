'use strict';

function factory() {
    function handler(req, res, next) {
        res.json(200, payload);
        return next();
    }

    return handler;
}
