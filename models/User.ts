import mongoose from "mongoose";
import { IUser } from "types/index";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String},
    isAdmin: { type: Boolean, required: true, default: false },
    // address:{type : [ String ]}
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;


export interface IAuthUser extends IUser {
  token: string;
}