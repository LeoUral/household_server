const Router = require("express");
const router = new Router();
// *: routes
const usersRouter = require("./usersRouter");

//* API
router.use("/users", usersRouter);
// router.use("/product");

module.exports = router;
