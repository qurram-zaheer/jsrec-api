const clarifai = require("clarifai");
const key = require("../config/keys");

const app = new Clarifai.App({
  apiKey: key.key
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json("unable to work with API"));
};
const entryHandler = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json("Unable to get entry number"));
};

module.exports = {
  entryHandler: entryHandler,
  handleApiCall: handleApiCall
};
