const Router = require("express");
const usersController = require("../controllers/usersController");
// const personalController = require("../controllers/personalController");
// const employeeController = require("../controllers/employeeController");
const router = new Router();

// *API (.../api/v1/auth/users/...)

//* USER
router.get("/test", usersController.getUsers);
// router.post("/registration");
// router.post("/login");

//* GROUP
// router.get("/group"); // получение данных группы
// router.post("/group"); // создание группы
// router.put("/group"); // обновление группы
// router.delete("/group"); // удаление группы

module.exports = router;
