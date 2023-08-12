import { test, generateTestNameAndNumber } from "./helper.js";
import { create, get, getAll, remove, rename } from "./bands.js";
import { dbConnection, closeConnection } from "./mongoConnection.js";
import _ from "lodash";

const db = await dbConnection();
await db.dropDatabase();


const band1 = await create(
  "Linkin Park",
  ["Alternative Rock", "Pop Rock", "Alternative Metal"],
  "http://www.linkinpark.com",
  "Warner",
  [
    "Chester Bennington",
    "Rob Bourdon",
    "Brad Delson",
    "Mike Shinoda",
    "Dave Farrell",
    "Joe Hahn",
  ],
  1996
);


try{
    const get_all = await getAll();
    console.log('getAll passed successfully!\n');
}
catch(e){
    console.log('getAll cannot pass successfully!');
}

try{
    const id = band1._id;
    const get = get(id);
    console.log('get passed successfully!\n');
}
catch(e){
    console.log('get cannot pass successfully!');
}

try{
    const get = get('fsldjflksadjfljadsfjla');
    console.log('get passed successfully!\n');
}
catch(e){
    console.log('get cannot pass successfully!');
}

try{
    const id = band1._id;
    const deleted = await remove(id);
    console.log('remove passed successfully!\n');
}
catch(e){
    console.log(`remove cannot pass successfully!`);
}

try{
    const id = band1._id;
    const renamed = band1.rename(id);
    console.log('rename passed successfully\n');
}
catch(e){
    console.log('rename cannot pass successfully!');
}

await closeConnection();