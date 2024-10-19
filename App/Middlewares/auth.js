const { render } = require("ejs");

function auth(req, res, next) {
  next();
}

module.exports = auth;
