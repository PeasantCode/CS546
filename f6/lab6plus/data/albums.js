import { ObjectId } from "mongodb";
import { checkStrArr, checkString, checkDate } from "../helper.js";
import { getBandsCollection } from "../config/mongoCollections.js";

const _collection = await getBandsCollection();

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

export { createAlbum, getAlbum, getAllAlbums, removeAlbum };
