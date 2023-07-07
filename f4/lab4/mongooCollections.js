import {closeConnection, dbConnection} from './mongoConnection.js';

/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }
    return _col;
  };
};

/* Now, you can list your collections here: */
export const bands = getCollectionFn('bands');


const bandddd = await bands();
await bandddd.find();
await closeConnection();