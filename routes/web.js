const express = require("express");
const router = express.Router();
const NewsController = require("../app/Http/Controllers/NewsController");
const ApiMobile = require("../app/Http/Controllers/ApiMobileController");
const IndexController = require("../app/Http/Controllers/IndexController");
const Storage = require("../app/Http/Providers/storage");

// Rute untuk update
router.post(
  "/news/update/:id",
  Storage.upload.single("image"),
  NewsController.update
);
router.get("/news/create", NewsController.create);
router.post(
  "/news/store",
  Storage.upload.single("image"),
  NewsController.store
);
router.get("/news/api", ApiMobile.index);
router.get("/", IndexController.index);
router.get("/news", NewsController.index);
router.get("/news/edit/:id", NewsController.show);
module.exports = router;
