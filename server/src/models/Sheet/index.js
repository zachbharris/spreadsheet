const mongoose = require("mongoose");

const initialData = [
  [
    { type: "text", value: "" },
    { type: "text", value: "" },
    { type: "number", value: "" }
  ],
  [{ value: "" }, { value: "" }, { value: "" }],
  [{ value: "" }, { value: "" }, { value: "" }],
  [{ value: "" }, { value: "" }, { value: "" }],
  [{ value: "" }, { value: "" }, { value: "" }]
];

const Sheet = mongoose.Schema({
  name: String,
  data: {
    type: String,
    default: JSON.stringify(initialData)
  },
  createdOn: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("Sheet", Sheet);
