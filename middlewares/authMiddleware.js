const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ message: "No token provided", success: false });
    }
    
    const token = authHeader.split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: "Auth Failed", success: false });
      }
      req.body.userId = decode.id;
      req.body.userType = decode.userType;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "Auth Failed", success: false });
  }
};
