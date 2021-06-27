module.exports = {
  findUserByLoginPassword: (req, res) => {
    const { user } = req;

    res.json(user);
  }
};
