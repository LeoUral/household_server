const Router = require("express");
// const personalController = require("../controllers/personalController");
// const employeeController = require("../controllers/employeeController");
const router = new Router();

// *API (.../api/v1/auth/product/...)

//* LIST OF PRODUCTs
router.post("/list_products"); // create list of products
router.get("/list_products"); // get list of products
router.put("/list_products"); // rename list of products
router.delete("/list_products"); // delete list of products

//* PRODUCTS
router.get("/List");

module.exports = router;
