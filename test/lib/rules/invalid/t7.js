function route6(req, res, next) {
    if (req.path) {
        callsomeAsync(req, next);
    } else {
        //next();
    }
}
