import { Router } from "express";
const router = Router();
import * as allAlbumsFunctions from "../data/albums.js";
import * as allBandsFunctions from "../data/bands.js";
import {
  check_Id,
  check_string,
  checkStrArray,
  checkDate,
} from "../data/helper.js";

router
  .route("/:bandId")
  .get(async (req, res) => {
    let bandId = req.params.bandId;
    try {
      bandId = check_Id(bandId, "bandId");
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const allAlbums = await allAlbumsFunctions.getAll(bandId);
      return res.json(allAlbums);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  })
  .post(async (req, res) => {
    let bandId = req.params.bandId;
    const data = req.body;
    if (!data)
      throw "name,genre, website,recordCompany,groupMembers,yearBandWasFormed must be exist!";
    let { title, releaseDate, tracks, rating } = data;
    try {
      bandId = check_Id(bandId, "bandId");
      title = check_string(title, "title");
      tracks = checkStrArray(tracks, "tracks");
      if (tracks.length < 3) throw "the length of tracks must longer than 3!";
      if (typeof rating !== "number")
        throw "the type of rating must be number!";
      if (rating > 5 || rating < 1 || (rating * 10) % 1 !== 0)
        throw "the rating is not valid!";
      releaseDate = checkDate(releaseDate, "releaseDate");
      const dataKeys = Object.keys(data);

      if (dataKeys.length !== 4)
        throw "the json provided does not match the schema!";
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const ifExists = await allBandsFunctions.get(bandId);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
    try {
      const newAlbums = await allAlbumsFunctions.create(
        bandId,
        title,
        releaseDate,
        tracks,
        rating
      );
      const updatedBand = await allBandsFunctions.get(bandId);
      return res.json(updatedBand);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  });

router
  .route("/album/:albumId")
  .get(async (req, res) => {
    let albumId = req.params.albumId;
    try {
      albumId = check_Id(albumId, "albumId");
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const theAlbum = await allAlbumsFunctions.get(albumId);
      return res.json(theAlbum);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  })
  .delete(async (req, res) => {
    let albumId = req.params.albumId;

    try {
      albumId = check_Id(albumId, "albumId");
      await allAlbumsFunctions.remove(albumId);
      const deletedInfo = { albumId: albumId, deleted: true };
      return res.json(deletedInfo);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  });

export default router;
