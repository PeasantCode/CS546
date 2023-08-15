import { MongoClient } from "mongodb";
import { config } from "./setting.js";
let _connection;
const _getDb = (() => {
  let _db;

  return async () => {
    if (!_connection) {
      _connection = await MongoClient.connect(config.serverUrl);
    }
    if (!_db) _db = _connection.db(config.dbName);
    return _db;
  };
})();

const _closeConnection = async () => {
  await _connection.close();
};

const db = await _getDb();
await db.dropDatabase();
export { _getDb, _closeConnection };
