const getIndexPage = (req, res) => {
  res.render('index', { title: "Home Page", readingList: [], finishedList: [], toReadList: [] })
}

const getReadingSection = (req, res) => {
  res.render('reading', { readingList: [] })
}

const getFinishedSection = (req, res) => {
  res.render('finished', { finishedList: [] })
}

const getToReadSection = (req, res) => {
  res.render('toread', { toReadList: [] })
}


module.exports = {
  getIndexPage,
  getReadingSection,
  getFinishedSection,
  getToReadSection
}
