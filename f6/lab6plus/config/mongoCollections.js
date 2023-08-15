import { _getDb } from "./mongoConnection.js";

const _getCollection =  (collectionName) => {
  //   const _collection = await _getDb()();
  let _collection;
  return async () => {
    if (!_collection) {
      const _db = await _getDb();
      _collection = await _db.collection(collectionName);
    }
    return _collection;
  };
};

export const getBandsCollection = _getCollection("bands");


