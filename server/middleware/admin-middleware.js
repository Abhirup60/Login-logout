const adminMiddleware = async (req, res, next) => {
  try {
    const data = req.user;
    if (!data.isAdmin) {
      return res.status(500).json({ msg: "access denied! you are not admin" });
    }
    next();
  } catch (error) {
    return res.status(400).json({ msg: "error from admin-middleware" });
  }
};

module.exports = adminMiddleware;
