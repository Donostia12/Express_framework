const News = require("../../Model/News");
const path = require("path");
const fs = require("fs");

exports.index = (req, res) => {
  News.getAll((err, results) => {
    if (err) {
      console.error(err);
    }
    res.render("index", { title: "Halaman Utama", results });
  });
};

exports.create = (req, res) => {
  res.render("createnews", { title: "Buat Berita Baru" });
};

exports.store = (req, res) => {

  const { title, desc, short_desc, created_at } = req.body;
  const image = req.file ? req.file.filename : null; 

  const newsData = {
    title,
    desc,
    short_desc,
    created_at,
    image,
  };

  News.create(newsData, (err, results) => {
    if (err) {
      console.error("Error creating news:", err);
      return res.status(500).send("Server Error");
    }

    res.redirect("/"); 
  });
};
exports.show = (req, res) => {
  const id = req.params.id;
  News.findById(id, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }
    if (!results) {
      return res.status(404).send("News not found");
    }

    res.render("shownews", { title: "Detail Berita", results });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const { title, content, desc, short_desc, created_at } = req.body;
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

  // Update data berita
  News.update(
    id,
    { title, content, desc, short_desc, created_at, image },
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Server Error");
      }
      if (!results) {
        return res.status(404).send("News not found");
      }
      res.redirect("/"); // Arahkan kembali ke halaman detail berita
    }
  );
};