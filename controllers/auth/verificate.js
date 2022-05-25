const { UserModel } = require("../../models/user");

const verificate = async (req, res, next) => {
  const { verificationToken } = req.params;
  const result = await UserModel.findOne({ verificationToken });
  if (!result)
    return res.status(404).json({
      message: "User not found",
    });

  await UserModel.findByIdAndUpdate(result._id, {
    verificationToken: null,
    verify: true,
  });
  return res.status(200).json({
    message: "Verification successful",
  });
};

module.exports = verificate;
