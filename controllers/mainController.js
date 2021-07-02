module.exports = {
  mainPage: (req, res) => {
    res.send('<h1>Main Page</h1>'
            + '<h3>Working Links:</h3>'
            + '<p><a href="/users">/users</a></p>'
            + '<p><a href="/authentication">/authentication</a></p>');
    res.end();
  }
};
