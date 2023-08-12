import { check_string, check_Id, checkStrArray } from "./helper.js";
import { bands } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";

export const create = async (
  name,
  genre,
  website,
  recordCompany,
  groupMembers,
  yearBandWasFormed
) => {
  name = check_string(name, "name");
  genre = checkStrArray(genre, "genre");
  website = check_string(website, "website");

    if (!website.match(/^http:\/\/www\.[a-zA-Z0-9]{5,}\.com$/))
      throw "website is wrong!";

    recordCompany = check_string(recordCompany, "recordCompany");
    groupMembers = checkStrArray(groupMembers, "groupMembers");
    if (typeof yearBandWasFormed !== "number")
      throw "the type of yearBandWasFormed must be number!";
    if (yearBandWasFormed < 1900 || yearBandWasFormed > 2023)
      throw "yearBandWasFormed is not a valid data!(it should be earlier than 2023 and later than 1900)";

    const bands_collection = await bands();
    const insertInfo = await bands_collection.insertOne({
      name,
      genre,
      website,
      recordCompany,
      groupMembers,
      yearBandWasFormed,
      albums: [],
      overallRating: 0,
    });
    if (insertInfo.acknowledged !== true) throw "insertion failed!";
    return await get(insertInfo.insertedId.toString());
};

export const getAll = async () => {
  const bandsCollection = await bands();
  const allBandsInfo = await bandsCollection.find();
  return allBandsInfo.toArray();
};

export const get = async (id) => {
  id = check_Id(id, "id");
  const bandsCollection = await bands();
  const targetBand = await bandsCollection.findOne({ _id: new ObjectId(id) });
  if (!targetBand) throw "this id does not exist in database!";
  targetBand._id = targetBand._id.toString();
  return targetBand;
};

export const remove = async (id) => {
  id = check_Id(id, "id");
  const bandsCollection = await bands();
  const deleteInfo = await bandsCollection.findOneAndDelete({
    _id: new ObjectId(id),
  });
  if (deleteInfo.lastErrorObject !== 1) throw "deletion failed!";
  const delSucceed = { bandId: id, deleted: true };
  return delSucceed;
};

export const update = async (
  id,
  name,
  website,
  recordCompany,
  groupMembers,
  yearBandWasFormed
) => {
  id = check_Id(id, "id");
  name = check_string(name, "name");
  genre = checkStrArray(genre, "genre");
  website = check_string(website, "website");

  if (!website.match(/^http:\/\/www\.[a-zA-Z0-9]{5,}\.com$/))
    throw "website is wrong!";

  recordCompany = check_string(recordCompany, "recordCompany");
  groupMembers = checkStrArray(groupMembers, "groupMembers");
  if (typeof yearBandWasFormed !== "number")
    throw "the type of yearBandWasFormed must be number!";
  if (yearBandWasFormed < 1900 || yearBandWasFormed > 2023)
    throw "yearBandWasFormed is not a valid data!(it should be earlier than 2023 and later than 1900)";

  const bandsCollection = await bands();
  const updateInfo = await bandsCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
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
  if (updateInfo.lastErrorObject.n !== 1) throw "update failed!";
  updateInfo.value._id = updateInfo.value._id.toString();
  return updateInfo.value;
};
