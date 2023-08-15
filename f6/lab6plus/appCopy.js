import { MongoClient, ObjectId } from "mongodb";
import { Router } from "express";
import express from "express";
const bandRouter = Router();
const albumRouter = Router();
const app = express();

import {
  checkStrArr,
  checkString,
  isStrArrEqual,
  checkDate,
} from "./helper.js";

const _connection = await MongoClient.connect("mongodb://localhost:27017");
const _db = _connection.db("lab6two");
const _collection = await _db.collection("bands");
// await _db.dropDatabase();

const createBand = async (
  name,
  genre,
  website,
  recordCompany,
  groupMembers,
  yearBandWasFormed
) => {
  name = checkString(name, "name");
  genre = checkStrArr(genre, "genre");
  website = checkString(website, "website");
  if (!website.match(/^http:\/\/www\.[0-9a-zA-Z]{5,}\.com$/)) throw "";
  recordCompany = checkString(recordCompany, "recordCompany");
  groupMembers = checkStrArr(groupMembers, "groupMembers");
  if (!yearBandWasFormed) throw "";
  if (typeof yearBandWasFormed !== "number") throw "";
  if (yearBandWasFormed > new Date().getFullYear || yearBandWasFormed < 1900)
    throw "";

  const ifAlreadyExist = await _collection.findOne({ name });

  if (ifAlreadyExist) throw "";

  const newBand = {
    name,
    genre,
    website,
    recordCompany,
    groupMembers,
    yearBandWasFormed,
    albums: [],
    overallRating: 0,
  };
  const insertionInfo = await _collection.insertOne(newBand);
  if (insertionInfo.acknowledged !== true) throw "";
  const newBandId = insertionInfo.insertedId.toString();
  return await getBand(newBandId);
};

const getAllBands = async () => {
  const allBands = await _collection.find().toArray();
  return allBands.map((element) => {
    element._id = element._id.toString();
    return element;
  });
};

const getBand = async (bandId) => {
  bandId = checkString(bandId, "bandId");
  if (!ObjectId.isValid(bandId)) throw "";
  const tarBand = await _collection.findOne({ _id: new ObjectId(bandId) });
  if (!tarBand) throw "";
  tarBand._id = tarBand._id.toString();
  return tarBand;
};

const removeBand = async (bandId) => {
  bandId = checkString(bandId, "bandId");
  if (!ObjectId.isValid(bandId)) throw "";
  const tarBand = await _collection.findOne({ _id: new ObjectId(bandId) });
  if (!tarBand) throw "";
  const deletionInfo = await _collection.findOneAndDelete({
    _id: new ObjectId(bandId),
  });
  if (deletionInfo.lastErrorObject.n !== 1) throw "";

  const removedBand = deletionInfo.value;
  removedBand._id = removedBand._id.toString();

  return removedBand;
};

const updateBand = async (
  bandId,
  name,
  genre,
  website,
  recordCompany,
  groupMembers,
  yearBandWasFormed
) => {
  bandId = checkString(bandId, "bandId");
  if (!ObjectId.isValid(bandId)) throw "";
  name = checkString(name, "name");
  genre = checkStrArr(genre, "genre");
  website = checkString(website, "website");
  if (website.match(/^http:\/\/www\.[0-9a-zA-Z]{5,}\.com$/)) throw "";
  recordCompany = checkString(recordCompany, "recordCompany");
  groupMembers = checkStrArr(groupMembers, "groupMembers");
  if (!yearBandWasFormed) throw "";
  if (typeof yearBandWasFormed !== "number") throw "";
  if (year > new Date().getFullYear || year < 1900) throw "";
  const oldBand = await _collection.findOne({ _id: new ObjectId(bandId) });
  if (
    oldBand.name === name ||
    oldBand.website === website ||
    oldBand.recordCompany === recordCompany ||
    oldBand.yearBandWasFormed === yearBandWasFormed
  )
    throw "";
  if (isStrArrEqual(oldBand.genre, genre)) throw "";
  if (isStrArrEqual(oldBand.groupMembers, groupMembers)) throw "";

  const updateInfo = await _collection.findOneAndUpdate(
    { _id: new ObjectId(bandId) },
    {
      $set: {
        name,
        genre,
        website,
        recordCompany,
        groupMembers,
        yearBandWasFormed,
      },
    },
    { returnDocument: "after" }
  );
  if (updateInfo.lastErrorObject.n !== 1) throw "";
  const updatedBand = updateInfo.value;
  updatedBand._id = updatedBand._id.toString();
  return updatedBand;
};

const createAlbum = async (bandId, title, releaseDate, tracks, rating) => {
  bandId = checkString(bandId, "bandId");
  if (!ObjectId.isValid(bandId)) throw "";
  title = checkString(title, "title");
  releaseDate = checkDate(releaseDate, "releaseDate");
  tracks = checkStrArr(tracks, "tracks");
  if (!rating) throw "";
  if (typeof rating !== "number") throw "";

  // recalculate overallRating
  const newAlbumId = new ObjectId();
  const oldBand = await _collection.findOne({ _id: new ObjectId(bandId) });
  if (!oldBand) throw "";
  const albumsAmount = oldBand.albums.length;
  const oldOverallRating = oldBand.overallRating;

  let newOverallRating = 0;
  if (albumsAmount === 1) newOverallRating = rating;
  else {
    newOverallRating =
      (oldOverallRating * albumsAmount + rating) /
      (albumsAmount + 1).toFixed(1);
  }

  const newAlbumInfo = await _collection.findOneAndUpdate(
    { _id: new ObjectId(bandId) },
    {
      $push: {
        albums: { _id: newAlbumId, title, releaseDate, tracks, rating },
      },
      $set: { overallRating: newOverallRating },
    },
    { returnDocument: "after" }
  );
  if (newAlbumInfo.lastErrorObject.n !== 1) throw "";

  return await getAlbum(newAlbumId.toString());
};

const getAllAlbums = async (bandId) => {
  bandId = checkString(bandId, "bandId");
  if (!ObjectId.isValid(bandId)) throw "";
  const tarBandInfo = await _collection.findOne({ _id: new ObjectId(bandId) });
  const tarBandAlbums = tarBandInfo.albums;
  return tarBandAlbums.map((element) => {
    element._id = element._id.toString();
    return element;
  });
};

const getAlbum = async (albumId) => {
  albumId = checkString(albumId, "albumId");
  if (!ObjectId.isValid(albumId)) throw "";
  const tarAlbumInfo = await _collection.findOne({
    albums: { $elemMatch: { _id: new ObjectId(albumId) } },
  });
  if (!tarAlbumInfo) throw "";
  const tarAllAlbums = tarAlbumInfo.albums;
  return tarAllAlbums.map((element) => {
    element._id = element._id.toString();
    return element;
  });
};

const removeAlbum = async (albumId) => {
  albumId = checkString(albumId, "albumId");
  if (!ObjectId.isValid(albumId)) throw "";
  const ifExists = await _collection.findOne({
    albums: { $elemMatch: { _id: new ObjectId(albumId) } },
  });
  if (!ifExists) throw "";
  const tarBandId = ifExists._id.toString();
  // recalculate overallRating
  const oldOverallRating = ifExists.oldOverallRating;
  const albumsAmount = ifExists.albums.length;

  const tarAlbumRating = ifExists.albums.find(
    (element) => element._id.toString() === albumId
  );
  let newOverallRating = 0;
  if (albumsAmount !== 1) {
    newOverallRating =
      (oldOverallRating * albumsAmount - tarAlbumRating) /
      (albumsAmount - 1).toFixed(1);
  }

  const removedInfo = await _collection.findOneAndUpdate(
    { _id: new ObjectId(tarBandId) },
    {
      $pull: { albums: { _id: new ObjectId(albumId) } },
      $set: { overallRating: newOverallRating },
    }
  );
  if (removedInfo.lastErrorObject.n !== 1) throw "";
  removedInfo.value._id = removedInfo.value._id.toString();
  return removedInfo;
};

bandRouter
  .route("/")
  .get(async (req, res) => {
    try {
      const allBands = await getAllBands();
      const formBands = allBands.map((band) => ({
        _id: band._id,
        name: band.name,
      }));
      return res.json(formBands);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  })
  .post(async (req, res) => {
    try {
      const data = req.body;
      if (!data) throw "";
      let {
        name,
        genre,
        website,
        recordCompany,
        groupMembers,
        yearBandWasFormed,
      } = data;
      name = checkString(name, "name");
      website = checkString(website, "website");
      recordCompany = checkString(recordCompany, "recordCompany");
      if (website.match(/http:\/\/www\.[a-zA-Z]{5,}\.com$/) === null)
        throw "this website is illegal!";
      genre = checkStrArr(genre, "genre");
      groupMembers = checkStrArr(groupMembers, "groupMembers");
      if (typeof yearBandWasFormed !== "number")
        throw "the type of yearBandWasFormed must be number!";
      if (
        yearBandWasFormed > new Date().getFullYear ||
        yearBandWasFormed < 1900
      )
        throw "the yearBandWasFormed is not valid!";
      const newBand = await createBand(
        name,
        genre,
        website,
        recordCompany,
        groupMembers,
        yearBandWasFormed
      );
      return res.json(newBand);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  });

bandRouter
  .route("/:id")
  .get(async (req, res) => {
    let id = req.params.id;
    try {
      id = checkString(id, "id");
      if (!ObjectId.isValid(id)) throw "";
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      const tarBand = await getBand(id);
      return res.json(tarBand);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  })
  .put(async (req, res) => {
    let id = req.params.id;
    const data = req.body;
    try {
      id = checkString(id, "id");
      if (!ObjectId.isValid(id)) throw "";
      if (!data) throw "";
      let {
        name,
        genre,
        website,
        recordCompany,
        groupMembers,
        yearBandWasFormed,
      } = data;
      name = checkString(name, "name");
      genre = checkStrArr(genre, "genre");
      website = checkString(website, "website");

      if (!website.match(/^http:\/\/www\.[a-zA-Z0-9]{5,}\.com$/))
        throw "website is wrong!";

      recordCompany = checkString(recordCompany, "recordCompany");
      groupMembers = checkStrArr(groupMembers, "groupMembers");

      if (typeof yearBandWasFormed !== "number")
        throw "the type of yearBandWasFormed must be number!";

      if (
        yearBandWasFormed < 1900 ||
        yearBandWasFormed > new Date().getFullYear
      )
        throw "yearBandWasFormed is not a valid data!(it should be earlier than 2023 and later than 1900)";

      const dataKeys = Object.keys(data);
      if (dataKeys.length !== 6)
        throw "the json provided does not match the schema!";

      const updatedBand = await updateBand(
        name,
        genre,
        website,
        recordCompany,
        groupMembers,
        yearBandWasFormed
      );
      return res.json(updatedBand);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  })
  .delete(async (req, res) => {
    const id = req.params.id;
    try {
      if (!ObjectId.isValid(id)) throw "";
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const ifExists = await getBand(id);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
    try {
      const deletionInfo = await removeBand(id);
      const returnInfo = { bandId: deletionInfo._id, deleted: true };
      return res.json(returnInfo);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  });

albumRouter
  .route("/:bandId")
  .get(async (req, res) => {
    let bandId = req.params.bandId;
    try {
      bandId = checkString(bandId, "bandId");
      if (!ObjectId.isValid(bandId)) throw "";
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const tarBand = await getBand(bandId);
      if (tarBand.albums.length === 0) throw "";
      const allAlbums = await getAllAlbums(bandId);
      return res.json(allAlbums);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  })
  .post(async (req, res) => {
    let bandId = req.params.bandId;
    const data = req.body;
    if (!data) throw "";
    let { title, releaseDate, tracks, rating } = data;

    try {
      bandId = checkString(bandId, "bandId");
      if (!ObjectId.isValid(bandId)) throw "";
      title = checkString(title, "title");
      releaseDate = checkDate(releaseDate, "releaseDate");
      tracks = checkStrArr(tracks, "tracks");
      if (typeof rating !== "number") throw "";
      if (rating < 1 || rating > 5 || (rating * 10) % 1 !== 0) throw "";
      if (releaseDate < 1900 || releaseDate > new Date().getFullYear + 1)
        throw "";

      const creationInfo = await createAlbum(
        bandId,
        title,
        releaseDate,
        tracks,
        rating
      );
      const updatedBand = await getBand(bandId);
      return res.json(updatedBand);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  });

albumRouter
  .route("/album/:albumId")
  .get(async (req, res) => {
    let bandId = req.params.albumId;
    try {
      bandId = checkString(albumId, "albumId");
      if (!ObjectId.isValid(albumId)) throw "";
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const tarAlbum = await getAlbum(albumId);
      return res.json(tarAlbum);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  })
  .delete(async (req, res) => {
    let albumId = req.params.albumId;
    try {
      if (!ObjectId.isValid(albumId)) throw "";
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const ifExists = await getAlbum(albumId);
      const deletionInfo = await removeAlbum(albumId);
      const returnInfo = { albumId: albumId, deleted: true };
      return res.json(returnInfo);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  });

app.use(express.json());
app.use("/bands", bandRouter);
app.use("/albums", albumRouter);

app.use("*", (req, res) => {
  return res.status(404).json({ error: "Route Not Found" });
});

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});

// const _closeConnection = await _connection.close();
