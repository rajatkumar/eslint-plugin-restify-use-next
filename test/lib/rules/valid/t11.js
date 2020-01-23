function factory() {
    return function handler(req, res, next) {
        res.send(200);
        next();
    };
}
