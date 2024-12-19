import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  phoneNumber: { type: Number, default: null },
  gender: {
    type: String,
    default: null,
  },
  refreshToken: { type: String, default: null },
  role: {
    type: String,
    default: "employee",
    // enum: ["employee", "admin", "customer"],
  },
});
const userModel = mongoose.model("users", userSchema, "users");
export default userModel;
