const router = require("express").Router();

// models
const Sheet = require("../../models/Sheet");

router
  .route("/")
  .get(async (req, res, next) => {
    const sheets = await Sheet.find({});
    if (!sheets.length) return res.status(404).send("No sheets available");
    return res.status(200).send(sheets);
  })
  .post((req, res, next) => {
    return new Sheet({
      name: req.body.name
    })
      .save()
      .then(newSheet => res.send(newSheet))
      .catch(err => res.status(400).send(err));
  });
router.use("/:sheetId", require("./sheet"));

module.exports = router;
