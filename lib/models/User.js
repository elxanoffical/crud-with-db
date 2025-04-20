import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true,
  },
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
