const getIndexPage = (req, res) => {
  res.render('index', { title: "Home Page" })
}

module.exports = {
  getIndexPage
}
