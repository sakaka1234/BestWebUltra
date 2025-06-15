import jwt from "jsonwebtoken";
const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  //send token
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, //prevent XSS attacks cross-site scripting attacks
  });

  return token;
};

export default generateToken;
