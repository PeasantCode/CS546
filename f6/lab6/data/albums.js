import { get as getBand } from "./bands.js";
import { checkStrArray, check_string, check_Id, checkDate } from "./helper.js";
import { bands } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";

export const create = async (bandId, title, releaseDate, tracks, rating) => {
  bandId = check_Id(bandId, "bandId");
  title = check_string(title, "title");
  releaseDate = check_string(releaseDate, "releaseDate");
  const bandsCollection = await bands();
  const targetBand = await getBand(bandId);
  if (!targetBand) throw "this band does not exist!";
  tracks = checkStrArray(tracks, "tracks");
  if (tracks.length < 3) throw "the length of tracks must longer than 3!";
  if (typeof rating !== "number") throw "the type of rating must be number!";
  if (rating > 5 || rating < 1 || (rating * 10) % 1 !== 0)
    throw "the rating is not valid!";
  releaseDate = checkDate(releaseDate, "releaseDate");
  const newAlbumId = new ObjectId();

  const oldBand = await bandsCollection.findOne({ _id: new ObjectId(bandId) });
  const oldAlbums = oldBand.albums;
  const albumsAmount = oldAlbums.length;
  const oldOverallRating = oldBand.overallRating;
  const newOverallRating =
    (oldOverallRating * albumsAmount + rating) / (albumsAmount + 1).toFixed(1);

  const updateInfoAlbum = await bandsCollection.findOneAndUpdate(
    {
      _id: new ObjectId(bandId),
    },
    {
      $push: {
        albums: {
          _id: newAlbumId,
          title,
          releaseDate,
          tracks,
          rating,
        },
      },
      $set: { overallRating: newOverallRating },
    },
    { returnDocument: "after" }
  );

  if (updateInfoAlbum.lastErrorObject.n !== 1)
    throw `putting album ${title} into band ${bandId} creation failed!`;

  return  await get(newAlbumId.toString());

};

export const getAll = async (bandId) => {
  bandId = check_Id(bandId, "bandId");
  const bandsCollection = await bands();
  const ifExists = await bandsCollection.findOne({ _id: new ObjectId(bandId) });
  if (!ifExists) throw "this band with bandId does not exist!";
  const allAlbums = ifExists.albums;
  if (allAlbums.length === 0)
    throw "there is no albums in the band with this bandId!";
  const Albums = allAlbums.map((element) => {
    element._id = element._id.toString();
    return element;
  });
  //   const albums = ifExists.albums;
  //   for (let i = 0; i < albums; i++) {
  //     albums[i]._id = albums._id.toString();
  //   }
  return Albums;
};

export const get = async (albumId) => {
  albumId = check_Id(albumId, "albumId");
  const bandsCollection = await bands();
  const ifExists = await bandsCollection.findOne({
    albums: { $elemMatch: { _id: new ObjectId(albumId) } },
  });
  if (!ifExists) throw "this album with albumId does not exist!";
  const allAlbums = ifExists.albums.map((element) => {
    element._id = element._id.toString();
    return element;
  });
  return allAlbums;
};

export const remove = async (albumId) => {
  albumId = check_Id(albumId, "albumId");
  const bandsCollection = await bands();
  const band2Update = await bandsCollection.findOne({
    albums: { $elemMatch: { _id: new ObjectId(albumId) } },
  });
  if (!band2Update) throw "this album with albumId does not exist!";
  const albumsAmount = band2Update.albums.length;
  const overallRating = band2Update.overAllRating;

  const album2Remove = band2Update.albums.find(
    (element) => element._id.toString() === albumId
  );

  //   for (let eachAlbum of band2Update.albums) {
  //     if (eachAlbum.albumId.toString() === albumId) {
  //       targetRating = eachAlbum.rating;
  //     }
  //   }

  let newOverallRating = 0;
  if (albumsAmount !== 1) {
    newOverallRating =
      (overallRating * albumsAmount - album2Remove.rating) /
      (albumsAmount - 1).toFixed(1);
  }

  //   const albumsDeleOverRating = ifExists.rating;
  const deleteInfo = await bandsCollection.findOneAndUpdate(
    {
      albums: { $elemMatch: { _id: new ObjectId(albumId) } },
    },
    {
      $pull: { albums: { _id: new ObjectId(albumId) } },
      $set: { overAllRating: newOverallRating },
    },
    {
      returnDocument: "after",
    }
  );
  if (deleteInfo.lastErrorObject.n !== 1) throw "deleting failed!";
  const allAlbums = deleteInfo.value.albums;
  return allAlbums.map((element) => {
    element._id = element._id.toString();
    return element;
  });
};
