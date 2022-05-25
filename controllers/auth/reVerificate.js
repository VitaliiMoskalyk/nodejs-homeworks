const { UserModel, JoiVerifySchema } = require("../../models/user");
const sendgrid = require("../../utils/sendgrid");

const reVerificate = async (req, res, next) => {
  try {
    const { error } = JoiVerifySchema.validate(req.body);
    if (error)
      return res.status(400).json({
        message: "Joi or another validation error",
      });
    const { email } = req.body;
    const result = await UserModel.findOne({ email });

    if (result.verify)
      return res.status(400).json({
        message: "Verification has already been passed",
      });

    sendgrid(
      email,
      `http://localhost:3000/api/users/verify/${result.verificationToken}`
    );
    return res.status(200).json({
      message: "Verification email sent",
    });
  } catch (error) {}
};

module.exports = reVerificate;
