import { Router } from "express";
import { ObjectId } from "mongodb";
import {
  createBand,
  getAllBands,
  getBand,
  updateBand,
  removeBand,
} from "../data/bands.js";
import { checkString, checkStrArr } from "../helper.js";
export const bandRouter = Router();

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
