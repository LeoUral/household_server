const path = require("path");
// require("dotenv");
require("dotenv").config({
  path: [path.resolve(__dirname, ".env")],
});

const express = require("express");
const cors = require("cors"); //отключает CORS

const app = express();
const jsonParser = express.json({ limit: "10mb" });

const router = require("./src/routers/index");

console.log(`HELLOW, run process => `, process.env.NODE_ENV); // test

// Настроить позже, при работе с Frontend
// const prodWhitelist = [
//   /^https:\/\/(?:[a-zA-Z0-9]+\.)*lotus-uems\.ru\/?/,
//   "https://81.91.59.38",
// ];
// const devWhitelist = ["http://localhost:3100", "http://localhost:3101"];
// const lanWhitelist = ["http://192.168.1.179:3100", "http://192.168.1.179:3101"];

// let whitelist = [];
// switch (process.env.NODE_ENV) {
//   case "production":
//     whitelist = prodWhitelist;
//     break;
//   case "development":
//     whitelist = [...devWhitelist, ...lanWhitelist];
//     break;
//   default:
//     break;
// }

// app.use(cors()); // отключает CORS
app.use(
  cors({
    // origin: whitelist, // включить при работе с Frontend
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    methods: "GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS",
    credentials: true,
    // credentials: 'include', //* для фронта в запросе
    // credentials: 'same-origin',
    allowedHeaders: "Content-Type, Authorization, X-Requested-With",
  }),
);
app.use(jsonParser);
app.use(express.urlencoded());

//* объект подключения к DB -> mongodb
// app.use(async (req, _res, next) => {
//   try {
//     req.db = await connectToDb();
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// *: проверка AUTH по URL: .../api/v1/auth/
app.use("/api/v1/auth", async (req, res, next) => {
  try {
    // console.log(`--->> проверка AUTH: .../api/v1/auth${req.path}`);
    const cookiesAll = req.headers.cookie;
    const resultStatus = await checkStatusCookie(cookiesAll);

    if (!resultStatus.result) throw new Error("Сессия не подтвердилась!");

    next();
  } catch (err) {
    console.log(`Ошибка проверки cookie: `, err);
    res.sendStatus(401);
    next(err);
  }
});

// app.use("/", (req, res, next) => {
//   // console.log(`BODY:::: `, req.body); // test
//   // console.log(`query::::  `, req.query); // test

//   next();
// });

// *:  API
app.use("/api/v1/auth", router);

// ловим не пойманные ошибки
app.use((err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
});

// начинаем прослушивание подключений на 3030 порту
app.listen(process.env.PORT, async (req, res) => {
  console.log(`Server listens port for REST API, PORT: ${process.env.PORT}`);
});

process.on("SIGINT", async () => {
  console.log("Received SIGINT. Closing MongoDB connection...");
  //   await closeConnection(); // Закрывает соединение с ДБ
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Received SIGTERM. Closing MongoDB connection...");
  //   await closeConnection(); // Закрывает соединение с ДБ
  process.exit(0);
});
