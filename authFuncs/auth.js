const jwt = require("jsonwebtoken");

const auth = (req, res) => {
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
        res.sendStatus(403);
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
      console.log(level);
      res.status(200).json({ level });
    });
  } catch (e) {
    console.log(e.message);
    res.sendStatus(403);
  }
};
module.exports = auth;
