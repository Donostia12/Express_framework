const about = require("../../Model/About");
const path = require("path");
const fs = require("fs");

//learn from youtube
exports.show = (req, res) => {
  about.findById(1, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }
    if (!results) {
      return res.status(404).send("About not found");
    }
    res.render("about/show", { title: "About", results });
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
  about.update(
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

      res.redirect("/about/1");
    }
  );
};
