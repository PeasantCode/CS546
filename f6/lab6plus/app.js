import express from "express";
import { bandRouter } from "./routes/bands.js";
import { albumRouter } from "./routes/albums.js";
const app = express();

app.use(express.json());
app.use("/bands", bandRouter);
app.use("/albums", albumRouter);

app.use("*", (req, res) => {
  return res.status(404).json({ error: "Route Not Found" });
});

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});

// const _closeConnection = await _connection.close();
