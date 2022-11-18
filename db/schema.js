import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  user: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  try {
    let password = await bcrypt.hash(this.password, 10);
    this.password = password;
    return next();
  } catch (err) {
    return err;
  }
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const user = model("User", userSchema);
