import mongoose from "mongoose";

export const flatSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: null,
  },
  name: { type: String, default: null },
  buildingNo: { type: String, required: true },
  wing: { type: String, required: true },
  flatNo: { type: String, required: true },
  unitNo: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  society: { type: String, default: "" },
  refreshToken: { type: String, default: null },
  role: {
    type: String,
    default: "member",
  },
});
const flatModel = mongoose.model("flat", flatSchema, "flats");
export default flatModel;
