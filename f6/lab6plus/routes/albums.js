import { Router } from "express";
import {
  createAlbum,
  getAllAlbums,
  getAlbum,
  removeAlbum,
} from "../data/albums.js";
import { getBand } from "../data/bands.js";
import { checkString, checkStrArr, checkDate } from "../helper.js";
import { ObjectId } from "mongodb";
export const albumRouter = Router();
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
    let albumId = req.params.albumId;
    try {
      albumId = checkString(albumId, "albumId");
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
