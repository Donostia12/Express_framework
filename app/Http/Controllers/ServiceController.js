const Service = require("../../Model/Service");

exports.index = (req, res) => {
  Service.getAll((err, results) => {
    if (err) {
      console.error(err);
    }
    res.render("service/index", { title: "Halaman Utama", results });
  });
};
exports.store = (req, res) => {
  res.render("service/create", { title: "Buat service Baru" });
};
