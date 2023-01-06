function requireUser(req, res, next) {
    // console.log('this is req---------->', req)
    console.log('this is req.user---------->', req.body)
    if (!req.body) {
    res.status(401);
        next({
        name: "MissingUserError",
        message: "You must be logged in to perform this action"
      });
    }
  
    next();
  }

  module.exports = {
    requireUser
  }