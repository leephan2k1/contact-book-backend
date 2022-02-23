const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Contact name is required"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("contact", schema);
