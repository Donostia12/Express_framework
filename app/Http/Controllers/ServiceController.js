const Service = require("app/Model/Service");
const path = require("path");
const fs = require("fs");
exports.index = (req, res) => {
  Service.getAll((err, results) => {
    if (err) {
      console.log(err);
    }
    res.render("service/index", { title: "Halaman Utama", results });
  });
};
exports.create = (req, res) => {
  res.render("service/create", { title: "Buat service Baru" });
};
exports.store = (req, res) => {
  const { title, short_desc, content_desc, created_at } = req.body;

  const image = req.file ? req.file.filename : null;
  const serviceData = {
    title,
    short_desc,
    content_desc,
    image,
    created_at,
  };
  Service.create(serviceData, (err, results) => {
    if (err) {
      console.error("Error creating service:", err);
      return res.status(500).send("Server Error");
    }
    res.redirect("/service");
  });
};
exports.show = (req, res) => {
  const id = req.params.id;
  Service.findById(id, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }
    if (!results) {
      return res.status(404).send("Service not found");
    }
    res.render("service/show", { title: "Detail Service", results });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const { title, short_desc, content_desc, created_at } = req.body;
  let image = req.body.oldImage;

  if (req.file) {
    image = req.file.filename;

    const oldImagePath = path.join(
      __dirname,
      "../../storage",
      req.body.oldImage
    );
    if (fs.existsSync(oldImagePath)) {
      fs.unlink(oldImagePath, (err) => {});
    }
  }
  Service.update(
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

      res.redirect("/service");
    }
  );
};
exports.delete = (req, res) => {
  const { id } = req.params;
  Service.delete(id, (err, results) => {
    if (err) {
      console.error("Error deleting service:", err);
      return res.status(500).send("Server Error");
    }
    if (!results) {
      return res.status(404).send("Service not found");
    }
    res.redirect("/service");
  });
};
