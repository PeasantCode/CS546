import bandsRoutes from "./bands.js";
import albumsRoutes from "./albums.js";

const constructorMethod = (app) => {
  app.use("/bands", bandsRoutes);
  app.use("/albums", albumsRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route Not Found" });
  });
};

export default constructorMethod;
