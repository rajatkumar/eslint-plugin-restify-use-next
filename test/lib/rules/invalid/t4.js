function route4(req, res, next) {
    if (req.path) {
        callsomeAsync(req, () => {
            //next();
        });
    } else {
        next();
    }
}
