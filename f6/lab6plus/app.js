import { MongoClient, ObjectId } from "mongodb";
import { checkStrArr, checkString, isStrArrEqual, checkDate } from "./helper";

const _connection = await MongoClient.connect("mongodb://localhost:27017");
const _db = _connection.db("lab6two");
const _collection = await db.collection("bands");

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
  if (website.match(/^http:\/\/www\.[0-9a-zA-Z]{5,}\.com$/)) throw "";
  recordCompany = checkString(recordCompany, "recordCompany");
  groupMembers = checkStrArr(groupMembers, "groupMembers");
  if (!yearBandWasFormed) throw "";
  if (typeof yearBandWasFormed !== "number") throw "";
  if (year > new Date().getFullYear || year < 1900) throw "";

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
  const allBands = await _collection.find();
  return allBands.toArray().map((element) => {
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
      $push: { albums: { _id: newAlbumId, releaseDate, tracks, rating } },
      $set: { overallRating: newOverallRating },
    },
    { returnDocument: "after" }
  );
  if (newAlbumInfo.lastErrorObject.n !== 1) throw "";

  return await _collection.getAlbum(newAlbumId.toString());
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

const remove = async (albumId) => {
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
      $pull: { albums: { __id: new ObjectId(albumId) } },
      $set: { overallRating: newOverallRating },
    }
  );
  if (removedInfo.lastErrorObject.n !== 1) throw "";
  removedInfo.value._id = removedInfo.value._id.toString();
  return removedInfo;
};

const _closeConnection = await _connection.close();
