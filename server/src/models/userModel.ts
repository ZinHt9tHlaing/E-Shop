import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: {
    url: string;
    public_alt: string;
  };
  role: "admin" | "customer";
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: [
        {
          url: String,
          public_alt: String,
        },
      ],
    },
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
}; // return boolean

export const User = mongoose.model<IUser>("User", userSchema);
