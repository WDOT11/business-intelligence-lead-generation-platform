const app = require("../dist/server.cjs").default;

module.exports = function (req, res) {
  return app(req, res);
};
