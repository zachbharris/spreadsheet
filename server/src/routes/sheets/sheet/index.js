const router = require("express").Router({ mergeParams: true });

// models
const Sheet = require("../../../models/Sheet");

router
  .route("/")
  .get(async (req, res, next) => {
    const { sheetId } = req.params;
    const sheet = await Sheet.findOne({ _id: sheetId }).catch(next);
    if (Object.keys(sheet).length === 0)
      return res.status(404).send("Sheet not found");
    return res.send(sheet);
  })
  .patch(async (req, res, next) => {
    try {
      const { sheetId } = req.params;
      const { name, data } = req.body;
      const sheet = await Sheet.findOne({ _id: sheetId }).catch(next);
      if (Object.keys(sheet).length === 0) return res.send("Sheet not found");

      if (name) sheet.name = name;
      if (data) sheet.data = data;

      await sheet.save();
      return res.send(sheet);
    } catch (e) {
      next(e);
    }
  })
  .delete((req, res, next) => {
    const { sheetId } = req.params;
    Sheet.findByIdAndRemove(sheetId, err => {
      if (err) return res.status(400).send(err);
      return res.send("Sheet deleted");
    });
  });

module.exports = router;
