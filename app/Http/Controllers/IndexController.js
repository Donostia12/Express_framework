exports.index = (req, res) => {
  res.render("index", { title: "Halaman Utama" });
};

exports.login = (req, res) => {
  res.render("login", { title: "Halaman Login" });
};
