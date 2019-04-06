server.get('./path', (req, res, next) => {
    if (req.path) {
        return callsomeAsync(req, next);
    }
    return next();
});
