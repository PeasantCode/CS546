import { Router } from "express";
const router = Router();
import * as all_functions from "../data/bands.js";
import { check_Id, check_string, checkStrArray } from "../data/helper.js";

router
  .route("/")
  .get(async (req, res) => {
    try {
      const allBands = await all_functions.getAll();
      return res.json(allBands);
    } catch (e) {
      return res.status(400);
    }
  })
  .post(async (req, res) => {
    try {
      const data = req.body;
      if (!data)
        throw "name,genre, website,recordCompany,groupMembers,yearBandWasFormed must be exist!";
      let {
        name,
        genre,
        website,
        recordCompany,
        groupMembers,
        yearBandWasFormed,
      } = data;
      name = check_string(name, "name");
      website = check_string(website, "website");
      recordCompany = check_string(recordCompany, "recordCompany");
      if (website.match(/http:\/\/www\.[a-zA-Z]{5,}\.com$/) === null)
        throw "this website is illegal!";
      for (let i of genre) {
        if (typeof i !== "string") throw "each of the genre must be string!";
      }
      for (let i of groupMembers) {
        if (typeof i !== "string")
          throw "each of the groupMembers must be string!";
      }
      if (typeof yearBandWasFormed !== "number")
        throw "the type of yearBandWasFormed must be number!";
      if (yearBandWasFormed > 2023 || yearBandWasFormed < 1900)
        throw "the yearBandWasFormed is not valid!";

      const newBand = await all_functions.create(
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

router
  .route("/:id")
  .get(async (req, res) => {
    let id = req.params.id;
    try {
      id = check_Id(id, "id");
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const band = await all_functions.get(id);
      return res.json(band);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  })
  .put(async (req, res) => {
    let id = req.params.id;
    try {
      id = check_Id(id, "id");
      const data = req.body;
      if (!data)
        throw "name,genre, website,recordCompany,groupMembers,yearBandWasFormed must be exist!";
      let {
        name,
        genre,
        website,
        recordCompany,
        groupMembers,
        yearBandWasFormed,
      } = data;
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

      const dataKeys = Object.keys(data);
      if (dataKeys.length !== 6)
        throw "the json provided does not match the schema!";
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const ifExists = await all_functions.get(id);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
    try {
      const updatedBand = await all_functions.update(id);
      return res.json(updatedBand);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  })
  .delete(async (req, res) => {
    let id = req.params.id;
    try {
      id = check_Id(id, "id");
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const ifExists = await all_functions.get(id);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
    try {
      const deletedInfo = await all_functions.remove(id);
      return res.json(deletedInfo);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  });

export default router;
