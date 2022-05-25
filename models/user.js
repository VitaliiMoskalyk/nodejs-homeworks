const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const Joi = require("joi");

const regexExpression = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$/;

const User = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: regexExpression,
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const JoiUserSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(regexExpression).required(),
  token: Joi.string(),
});

const JoiVerifySchema = Joi.object({
  email: Joi.string().pattern(regexExpression).required(),
});

const UserModel = mongoose.model("user", User);

module.exports = {
  UserModel,
  JoiUserSchema,
  JoiVerifySchema,
};
