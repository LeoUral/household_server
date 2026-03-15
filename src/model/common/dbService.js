const MongoClient = require("mongodb").MongoClient;

const config = {
  username: process.env.MONGODB_USER,
  password: process.env.MONGODB_PASSWORD,
  host: "localhost",
  port: 27017,
  authSource: "admin",
  currentDb: "household",
};

let url;

// if (config.username && config.password) {
//   url = `mongodb://${config.username}:${config.password}@${config.host}:${config.port}/?authSource=${config.authSource}`;
// } else {
url = `mongodb://${config.host}:${config.port}`;
// }

const clientPromise = new MongoClient(url, {
  // useUnifiedTopology: true,
  maxPoolSize: 10,
}); // новое подключение

let db = null;
let client = null;

/**
 * Connects to the MongoDB database.
 * @throws {Error} If connection fails
 */

async function connectToDb() {
  // avoid multiple connections
  if (db !== null) {
    return db;
  }

  client = await clientPromise.connect();
  db = client.db(config.currentDb);
  return db;
}

async function closeConnection() {
  if (client) {
    await client.close();
    db = null;
    client = null;
  }
}

module.exports = { connectToDb, closeConnection };
