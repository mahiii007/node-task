const { Schema, model } = require("mongoose");
const agencySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required."],
    },
    agencyId: {
      type: String,
      required: [true, "agencyid is required."],
      unique: [true, "agencyId must be unique."],
    },
    state: {
      type: String,
      required: [true, "state is required."],
    },
    city: {
      type: String,
      required: [true, "city is required."],
    },
    phoneNo: {
      type: String,
      required: [true, "phoneNo is required."],
      match: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
      unique: true,
    },
    address1: {
      type: String,
      required: [true, "address1 is required."],
    },
    address2: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("agency", agencySchema);
