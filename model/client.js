const { Schema, model } = require("mongoose");
const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required."],
    },
    agencyId: {
      type: String,
      required: [true, "agencyId is required."],
    },
    clientId: {
      type: String,
      required: [true, "clientId is required."],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required."],
      match:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      unique: true,
    },
    totalBill: {
      type: Number,
      required: [true, "totalBill is required."],
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
  },
  { timestamps: true }
);

module.exports = model("client", clientSchema);
