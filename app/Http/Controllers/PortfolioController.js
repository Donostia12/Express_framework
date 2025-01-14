const portfolio = require("../../Model/portfolio");
exports.index = (req, res) => {
  portfolio.getAll((err, result) => {
    if (err) {
      console.error(err);
    }
    res.render("portfolio/index", { result });
  });
};

exports.create = (req, res) => {
  res.render("portfolio/create", { title: "Buat Portfolio Baru" });
};
exports.store = (req, res) => {
  const { title, created_at } = req.body;
  const image = req.file ? req.file.filename : null;

  const newsData = {
    title,
    created_at,
    image,
  };

  portfolio.create(newsData, (err, results) => {
    if (err) {
      console.error("Error creating news:", err);
      return res.status(500).send("Server Error");
    }

    res.redirect("/portfolio");
  });
};
