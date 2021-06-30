module.exports = {
  findUserByLoginPassword: (req, res, next) => {
    try {
      const { user } = req;

      res.json(user);
    } catch (err) {
      next(err);
    }
  }
};
