const jwt = require("jsonwebtoken");
const User = require("../Schemas/DB/user");

const auth = async (req, res) => {
  try {
    const { token } = req.body;
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      let level;
      console.log(decoded);
      if (err) {
        console.log(err);
        res.sendStatus(403);
      }
      if (decoded.exp <= new Date()) {
        console.log("token has expired");
        return res.sendStatus(403);
      }
      switch (decoded.role) {
        case "patient":
          level = 1;
          break;
        case "employee":
          level = 2;
          break;
        case "admin":
          level = 3;
          break;
      }
      const action = async () => {
        let userData;
        let data;
        if (decoded.hasOwnProperty("googleId") && decoded.googleId) {
          data = await User.findOne({ googleId });
          userData = { ...data };
        } else if (decoded.hasOwnProperty("facebookId") && decoded.facebookId) {
          data = await User.findOne({ facebookId });
          userData = { ...data };
        } else {
          data = await User.findOne({ username: decoded.user })
            .populate("personalDetails")
            .populate("Address")
            .populate("kinInfo")
            .populate("Services")
            .populate("Image");
          data["_doc"]["password"] = "ha gotya";
          userData = { ...data["_doc"] };
        }
        res.status(200).json({ level, userData });
      };
      action();
    });
  } catch (e) {
    console.log(e.message);
  }
};
module.exports = auth;
