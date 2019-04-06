server.get('./path', (req, res, next) => {
    if (req.path) {
        return callsomeAsync(req, function(done) {
            return done;
        });
    } else {
        return next();
    }
});
