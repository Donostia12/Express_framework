const News = require("../../Model/News");
const path = require("path");
const fs = require("fs");
const { debug } = require("console");

exports.index = (req, res) => {
  News.getAll((err, results) => {
    if (err) {
      console.error(err);
    }

    res.render("news/index", { title: "Halaman Utama", results });
  });
};

exports.create = (req, res) => {
  res.render("news/create", { title: "Buat Berita Baru" });
};

exports.store = (req, res) => {
  const { title, content_desc, short_desc, created_at } = req.body;
  const image = req.file ? req.file.filename : null;

  const newsData = {
    title,
    content_desc,
    short_desc,
    created_at,
    image,
  };

  News.create(newsData, (err, results) => {
    if (err) {
      console.error("Error creating news:", err);
      return res.status(500).send("Server Error");
    }

    res.redirect("/news");
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

    res.render("news/show", { title: "Detail Berita", results });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const { title, content_desc, short_desc, created_at } = req.body;
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
    { title, content_desc, short_desc, created_at, image },
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Server Error");
      }
      if (!results) {
        return res.status(404).send("News not found");
      }

      res.redirect("/news"); // Arahkan kembali ke halaman detail berita
    }
  );
};
exports.delete = (req, res) => {
  const { id } = req.params;

  News.delete(id, (err, results) => {
    if (err) {
      console.error("Error deleting news:", err);
      return res.status(500).send("Server Error");
    }
    if (!results) {
      return res.status(404).send("News not found");
    }

    res.redirect("/news"); // Arahkan ke halaman daftar berita
  });
};
