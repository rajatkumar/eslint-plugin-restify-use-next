function route5(req, res, next) {
    if (req.path) {
        next();
    } else {
        callsomeAsync(req, () => {
            next();
        });
    }
}
