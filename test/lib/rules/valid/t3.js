function route3(req, res, next) {
    if (req.path) {
        next();
    } else {
        next(new Error('No path'));
    }
}
