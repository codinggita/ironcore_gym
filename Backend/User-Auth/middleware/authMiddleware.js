import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  let token = req.cookies.token || req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Contains _id and role
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

const ensureAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

export default protect;
export { ensureAdmin };