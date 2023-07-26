import { bands } from "./mongoCollections.js";
import { Collection, ObjectId } from "mongodb";
import { check_string } from "./helper.js";
import { update } from "lodash";
export const create = async (
  name,
  genre,
  website,
  recordCompany,
  groupMembers,
  yearBandWasFormed
) => {
  name = name.trim();
  website = website.trim();
  recordCompany = recordCompany.trim();
  if (name === "") throw "name must be provided!";
  if (website === "") throw "website must be provided!";
  if (recordCompany === "") throw "recordCompany must be provided!";
  if (yearBandWasFormed === "") throw "yearBandWasFormed must be provided!";
  if (!Array.isArray(genre)) throw "the type of genre must be array!";
  if (!Array.isArray(groupMembers))
    throw "the type of groupMembers must be array!";
  if (genre.length === 0) throw "genre must be provided!";
  if (groupMembers.length === 0) throw "groupMembers must be provided!";
  if (yearBandWasFormed === undefined)
    throw "yearBandWasFormed must be provided!";

  check_string(name, "name");
  check_string(website, "website");
  check_string(recordCompany, "recordCompany");

  if (website.match(/http:\/\/www\.[a-zA-Z]{5,}\.com$/) === null)
    throw "this website is illegal!";

  for (let i of genre) {
    if (typeof i !== "string") throw "each of the genre must be string!";
  }
  for (let i of groupMembers) {
    if (typeof i !== "string") throw "each of the groupMembers must be string!";
  }
  if (typeof yearBandWasFormed !== "number")
    throw "the type of yearBandWasFormed must be number!";
  if (yearBandWasFormed > 2023 || yearBandWasFormed < 1900)
    throw "the yearBandWasFormed is not valid!";

  const new_band = {
    name,
    genre,
    website,
    recordCompany,
    groupMembers,
    yearBandWasFormed,
  };
  const bands_collection = await bands();
  const insert_info = await bands_collection.insertOne(new_band);
  if (!insert_info.acknowledged) throw "add failed!";
  return await get(insert_info.insertedId.toString());
};

export const get = async (id) => {
  id = check_string(id, "id");
  if (!ObjectId.isValid(id)) throw "the id is not valid!";
  const bands_collection = await bands();
  const bands_info = await bands_collection.findOne({ _id: new ObjectId(id) });
  if (!bands_info) throw "could not find the target!";
  return bands_info;
};

export const getAll = async () => {
  const bands_collection = await bands();
  const all_bands = await bands_collection.find();
  return all_bands.toArray();
};

export const remove = async (id) => {
  id = check_string(id, "id");
  if (!ObjectId.isValid(id)) throw "the id is not valid!";
  const the_band = await get(id);
  if (!the_band) throw "this id does not exist!";
  const bands_collection = bands();
  const deleteInfo = await bands_collection.findOneAndDelete({
    _id: new ObjectId(id),
  });
  if (!deleteInfo.value) throw "delete failed!";
  console.log(`${deleteInfo.value.name} has been successfully deleted!`);
};

export const rename = async (id, newName) => {
  id = check_string(id, "id");
  if (!ObjectId.isValid(id)) throw "the id is not valid!";
  newName = check_string(newName, "newName");
  const the_band = await get(id);
  if (!the_band) throw "this band does not exist!";
  const bands_collection = await bands();
  const if_already_exist = await bands_collection.findOne({ name: newName });
  if (if_already_exist) throw "this name has been existed!";
  const updatedInfo = await bands_collection.findOneAndUpdate(
    {
      _id: new ObjectId(id),
    },
    {
      $set: { name: newName },
    },
    { returnDocument: "after" }
  );
  if ((updatedInfo, lastErrorObject.n === 0))
    throw "could not update band's name";
    updatedInfo._id = updatedInfo._id.toString();
  return updatedInfo;
};

// const aaa = await create( "Linkin Park",
// ["Alternative Rock", "Pop Rock", "Alternative Metal"],
// "http://www.linkinpark.com",
//  "Warner",
//  ["Chester Bennington", "Rob Bourdon", "Brad Delson", "Mike Shinoda", "Dave Farrell", "Joe Hahn"],
//  1996)
//  console.log(aaa);
