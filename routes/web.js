const express = require("express");
const router = express.Router();
const NewsController = require("../app/Http/Controllers/NewsController");
const ApiMobile = require("../app/Http/Controllers/ApiMobileController");
const IndexController = require("../app/Http/Controllers/IndexController");
const Storage = require("../app/Http/Providers/storage");
const ServiceController = require("../app/Http/Controllers/ServiceController");
const ProductController = require("../app/Http/Controllers/ProductController");
const PorfolioController = require("../app/Http/Controllers/PortfolioController");
//rute untuk api
router.get("/news/api", ApiMobile.news);
router.get("/service/api", ApiMobile.service);
router.get("/product/api", ApiMobile.Product);
router.get("/portfolio/api", ApiMobile.portofolio);
// Rute untuk news
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

router.get("/", IndexController.index);
router.get("/news", NewsController.index);
router.get("/news/delete/:id", NewsController.delete);
router.get("/news/edit/:id", NewsController.show);

//rute untuk service
router.get("/service", ServiceController.index);
router.get("/service/create", ServiceController.create);
router.post(
  "/service/store",
  Storage.upload.single("image"),
  ServiceController.store
);
router.get("/service/edit/:id", ServiceController.show);
router.post(
  "/service/update/:id",
  Storage.upload.single("image"),
  ServiceController.update
);
router.get("/service/delete/:id", ServiceController.delete);

//route untuk product
router.get("/product", ProductController.index);
router.get("/product/create", ProductController.create);
router.post(
  "/product/store",
  Storage.upload.single("image"),
  ProductController.store
);
router.get("/product/edit/:id", ProductController.show);
router.post(
  "/product/update/:id",
  Storage.upload.single("image"),
  ProductController.update
);
router.get("/product/delete/:id", ProductController.delete);

//portofolio
router.get("/portfolio", PorfolioController.index);
router.get("/portfolio/create", PorfolioController.create);
router.post(
  "/portfolio/store",
  Storage.upload.single("image"),
  PorfolioController.store
);
router.get("/portfolio/edit/:id", PorfolioController.show);
module.exports = router;
router.post(
  "/portfolio/update/:id",
  Storage.upload.single("image"),
  PorfolioController.update
);
