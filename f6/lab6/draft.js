import { ObjectId } from "mongodb";
const band1 = {
  _id: new ObjectId(),
  albums: [
    { _id: new ObjectId() },
    { _id: new ObjectId() },
    { _id: new ObjectId() },
  ],
};
const documentId2String = (document) => {
  // TODO
  const albums = document.albums;
  for (let i = 0; i < albums.length; i++) {
    albums[i]._id = albums[i]._id.toString();
  }
  band1._id = band1._id.toString();
  band1.albums = albums;
  const newDocument = band1;
  return newDocument;
};
console.log(documentId2String(band1));
