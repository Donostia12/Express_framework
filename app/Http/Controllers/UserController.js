const Auth = require("../../../config/auth");

exports.index = (req, res) => {
  res.render("login", { title: "Halaman Login" });
};
exports.login = (req, res) => {
  Auth.login(req.body.username, req.body.password).then((result) => {
    if (result.success) {
      res.redirect("/");
    } else {
      res.redirect("/login");
      console.log();
      console.log("gagal");
    }
  });
};
