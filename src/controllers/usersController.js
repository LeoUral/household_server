const { nanoid } = require("nanoid");

require("dotenv").config();

/**
 * Контроллер работы с User
 */
class UserController {
  // методы обработки запросов

  //todo: test
  async getUsers(req, res) {
    try {
      const test = "test good";

      const db = req.db;

      const result = await db.collection("users").insertOne({
        _id: nanoid(),
        name: "Leo",
        email: "123@mail.ru",
      });
      console.log(result); // test

      res.json({ result: test });
    } catch (err) {
      console.log(`ERROR: `, err);
    }
  }
}

module.exports = new UserController();
