const Portfolio = require("../../Model/portfolio");
const portfolio = require("../../Model/portfolio");
const path = require("path");
const fs = require("fs");

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

exports.show = (req, res) => {
  const id = req.params.id;
  portfolio.findById(id, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }
    if (!results) {
      return res.status(404).send("Portfolio not found");
    }
    res.render("portfolio/show", { title: "Detail Portfolio", results });
  });
};
exports.update = (req, res) => {
  const id = req.params.id;
  const { title, created_at } = req.body;
  let image = req.body.oldImage;

  if (req.file) {
    image = req.file.filename;

    const oldImagePath = path.join(
      __dirname,
      "../../storage",
      req.body.oldImage
    );
    if (fs.existsSync(oldImagePath)) {
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error("Error deleting old image:", err);
      });
    }
  }

  Portfolio.update(id, { title, created_at, image }, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }
    if (!results) {
      return res.status(404).send("News not found");
    }

    res.redirect("/portfolio");
  });
};
