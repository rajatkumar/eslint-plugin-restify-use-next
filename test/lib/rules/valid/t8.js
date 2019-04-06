function route6(req, res, next) {
    if (req.path) {
        return callsomeAsync(req, next);
    } else {
        return next();
    }
}
