import { MongoClient } from "mongodb";

const config = {
  serverUrl: "mongodb://127.0.0.1:27017",
  dbName: "mongoAdv",
};

let _connection, _db;
const dbConnection = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(config.serverUrl);
    _db = _connection.db(config.dbName);
  }

  return _db;
};
const closeConnection = async () => {
  if (_connection) _connection.close();
};

const getCollection = async (collection) => {
  if (!_connection) _db = await dbConnection();
  return await _db.collection(collection);
};

const makeDocs = (str, num, bool, numOfDoc = 1) => {
  if (numOfDoc === 1) {
    str = String(str);
    return { str, num, bool, arr: [str, num, bool], obj: { str, num, bool } };
  }

  let arrOfDocs = [];
  let s = str,
    n = num,
    b = bool;
  for (let i = 0; i < numOfDoc; i++) {
    s = str + i;
    n += i;
    b = !b;
    s = String.fromCharCode(s).toString();
    arrOfDocs.push({
      str: s,
      num: n,
      bool: b,
      arr: [s, n, b],
      obj: { str: s, num: n, bool: b },
    });
  }
  return arrOfDocs;
};
console.log(makeDocs(0, 1, false, 3));

const mongoAdv = await getCollection("mongoAdv");
await _db.dropDatabase();
console.log("running");

// CREATE
const a = await mongoAdv.find({}).toArray();
console.log(a);
// []

const b = await mongoAdv.insertOne(makeDocs(0, 1, false));
console.log(b);
/* {
  acknowledged: true,
  insertedId: new ObjectId("641f3c602cbe52b4cf45ccd9")
} */

const c = await mongoAdv.insertMany([makeDocs(1, 2, true)]);
console.log(c);
/* {
  acknowledged: true,
  insertedCount: 1,
  insertedIds: { '0': new ObjectId("641f40343f66385c7ecd718c") }
} */

const d = await mongoAdv.insertMany(makeDocs(2, 3, true, 3));
console.log(d);
/* {
  acknowledged: true,
  insertedCount: 3,
  insertedIds: {
    '0': new ObjectId("641f40aa8dbea9cfede64379"),
    '1': new ObjectId("641f40aa8dbea9cfede6437a"),
    '2': new ObjectId("641f40aa8dbea9cfede6437b")
  }
} */

// READ
// https://www.mongodb.com/docs/manual/reference/method/js-cursor/
// https://www.mongodb.com/docs/manual/reference/operator/query/
const e = await mongoAdv.find({}).toArray();
console.log(e);
/* [
  {
    _id: new ObjectId("641f45f7793a98ddab88a6c3"),
    str: '0',
    num: 1,
    bool: false,
    arr: [ '0', 1, false ],
    obj: { str: '0', num: 1, bool: false }
  },
  {
    _id: new ObjectId("641f45f7793a98ddab88a6c4"),
    str: '1',
    num: 2,
    bool: true,
    arr: [ '1', 2, true ],
    obj: { str: '1', num: 2, bool: true }
  },
  {
    _id: new ObjectId("641f45f7793a98ddab88a6c5"),
    str: '\x02',
    num: 3,
    bool: false,
    arr: [ '\x02', 3, false ],
    obj: { str: '\x02', num: 3, bool: false }
  },
  {
    _id: new ObjectId("641f45f7793a98ddab88a6c6"),
    str: '\x03',
    num: 4,
    bool: true,
    arr: [ '\x03', 4, true ],
    obj: { str: '\x03', num: 4, bool: true }
  },
  {
    _id: new ObjectId("641f45f7793a98ddab88a6c7"),
    str: '\x04',
    num: 6,
    bool: false,
    arr: [ '\x04', 6, false ],
    obj: { str: '\x04', num: 6, bool: false }
  }
] */

const e1 = await mongoAdv
  .find({})
  .project({ _id: 0, str: 1, arr: 1, obj: 1 })
  .skip(1)
  .limit(3)
  .sort({ "obj.bool": 1, "obj.num": -1 })
  .toArray();
console.log(e1);
/* [
  {
    str: '\x02',
    arr: [ '\x02', 3, false ],
    obj: { str: '\x02', num: 3, bool: false }
  },
  {
    str: '0',
    arr: [ '0', 1, false ],
    obj: { str: '0', num: 1, bool: false }
  },
  {
    str: '\x03',
    arr: [ '\x03', 4, true ],
    obj: { str: '\x03', num: 4, bool: true }
  }
] */

const f = await mongoAdv.findOne({ bool: true });
console.log(f);
/* {
  _id: new ObjectId("641f43babf23cc69613d583e"),
  str: '1',
  num: 2,
  bool: true,
  arr: [ '1', 2, true ],
  obj: { str: '1', num: 2, bool: true }
} */

const g = await mongoAdv.find({ bool: true }).toArray();
console.log(g);
/* [
  {
    _id: new ObjectId("641f45f7793a98ddab88a6c4"),
    str: '1',
    num: 2,
    bool: true,
    arr: [ '1', 2, true ],
    obj: { str: '1', num: 2, bool: true }
  },
  {
    _id: new ObjectId("641f45f7793a98ddab88a6c6"),
    str: '\x03',
    num: 4,
    bool: true,
    arr: [ '\x03', 4, true ],
    obj: { str: '\x03', num: 4, bool: true }
  }
] */

const h = await mongoAdv.find({ arr: { $elemMatch: { $eq: true } } }).toArray();
console.log(h);
/* [
  {
    _id: new ObjectId("641f45f7793a98ddab88a6c4"),
    str: '1',
    num: 2,
    bool: true,
    arr: [ '1', 2, true ],
    obj: { str: '1', num: 2, bool: true }
  },
  {
    _id: new ObjectId("641f45f7793a98ddab88a6c6"),
    str: '\x03',
    num: 4,
    bool: true,
    arr: [ '\x03', 4, true ],
    obj: { str: '\x03', num: 4, bool: true }
  }
] */
const h1 = await mongoAdv.findOne({ arr: { $elemMatch: { $eq: true } } });
console.log(h1);
/* {
  _id: new ObjectId("641f46f48b3f48522913e344"),
  str: '1',
  num: 2,
  bool: true,
  arr: [ '1', 2, true ],
  obj: { str: '1', num: 2, bool: true }
} */

// Update
// https://www.mongodb.com/docs/manual/reference/operator/update/
const i = await mongoAdv.findOneAndUpdate(
  { bool: true },
  { $set: { "obj.bool": false }, $inc: { num: 7 } },
  { returnDocument: "after" }
);
console.log(i);
/* {
  lastErrorObject: { n: 1, updatedExisting: true },
  value: {
    _id: new ObjectId("641f4a715de58c00a02e34a8"),
    str: '1',
    num: 9,
    bool: true,
    arr: [ '1', 2, true ],
    obj: { str: '1', num: 2, bool: false }
  },
  ok: 1
} */

const j = await mongoAdv.updateOne(
  { bool: true, num: 9 },
  { $mul: { num: 1 / 3 } }
);
console.log(i);
/* {
  lastErrorObject: { n: 1, updatedExisting: true },
  value: {
    _id: new ObjectId("641f4c8eadacf2157a9fbf1b"),
    str: '1',
    num: 9,
    bool: true,
    arr: [ '1', 2, true ],
    obj: { str: '1', num: 2, bool: false }
  },
  ok: 1
} */
console.log(await mongoAdv.find({ _id: i.value._id }).toArray());
/* [
  {
    _id: new ObjectId("641f4c8eadacf2157a9fbf1b"),
    str: '1',
    num: 3,
    bool: true,
    arr: [ '1', 2, true ],
    obj: { str: '1', num: 2, bool: false }
  }
]
 */

const k = await mongoAdv.updateMany(
  {
    $where: () => {
      num % 2 == 0;
    },
  },
  { $addToSet: { arr02: { $each: [1, 2, 3] } } }
);
console.log(k);
/* {
  acknowledged: true,
  modifiedCount: 5,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 5
} */
console.log(
  await mongoAdv
    .find({ arr02: { $exists: true } })
    .project({ _id: 0, str: 0, num: 0, bool: 0, arr: 0 })
    .toArray()
);
/* [
  { obj: { str: '0', num: 1, bool: false }, arr02: [ 1, 2, 3 ] },
  { obj: { str: '1', num: 2, bool: false }, arr02: [ 1, 2, 3 ] },
  { obj: { str: '\x02', num: 3, bool: false }, arr02: [ 1, 2, 3 ] },
  { obj: { str: '\x03', num: 4, bool: true }, arr02: [ 1, 2, 3 ] },
  { obj: { str: '\x04', num: 6, bool: false }, arr02: [ 1, 2, 3 ] }
]
 */

console.log(await mongoAdv.find({ str: "\x03" }).toArray());
/* [
  {
    _id: new ObjectId("641f5129e6e9e4ca404f94b7"),
    str: '\x03',
    num: 4,
    bool: true,
    arr: [ '\x03', 4, true ],
    obj: { str: '\x03', num: 4, bool: true },
    arr02: [ 1, 2, 3 ]
  }
] */

const l = await mongoAdv.findOneAndReplace(
  { str: "\x03" },
  { arr03: [] },
  { returnDocument: "after" }
);
console.log(l);
// ???
/* {
  lastErrorObject: { n: 1, updatedExisting: true },
  value: { _id: new ObjectId("641f70e20d7ff0e62d31e8c0"), arr03: [] },
  ok: 1
}*/
console.log(await mongoAdv.find({ str: "\x03" }).toArray());
/* [] */
console.log(await mongoAdv.find({ arr03: { $exists: true } }).toArray());
/* [ { _id: new ObjectId("641f51933d8cff097eb59f84"), arr03: [] } ] */
console.log(
  await mongoAdv.findOneAndReplace({ str: "nothing" }, { arr03: [] })
);
/* {
  lastErrorObject: { n: 0, updatedExisting: false },
  value: null,
  ok: 1
} */

const m = await mongoAdv.replaceOne({ arr03: [] }, { arr03: [3, 2, 1] });
console.log(m);
/* {
  acknowledged: true,
  modifiedCount: 1,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 1
} */





// Delete
const n = await mongoAdv.findOneAndDelete(
  { arr03: [3, 2, 1] },
  { projection: { _id: 0 } }
);
console.log(n);
/* { lastErrorObject: { n: 1 }, value: { arr03: [ 3, 2, 1 ] }, ok: 1 }*/

console.log(await mongoAdv.find().toArray());

const o = await mongoAdv.deleteOne();
console.log(o);
/* { acknowledged: true, deletedCount: 1 } */

const p = await mongoAdv.deleteMany();
console.log(p);
/* { acknowledged: true, deletedCount: 3 } */

console.log(await mongoAdv.find().toArray());
/* [] */


console.log(await mongoAdv.insertOne({}))