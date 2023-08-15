import { ObjectId } from "mongodb";
import {
  checkStrArr,
  checkString,
  isStrArrEqual,
  checkDate,
} from "../helper.js";
import { getBandsCollection } from "../config/mongoCollections.js";

const _collection = await getBandsCollection();

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

export { createBand, getAllBands, getBand, removeBand, updateBand };
