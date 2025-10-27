const db = require('../db/queries')

const getIndexPage = async (req, res) => {
  const finishedList = await db.getFinishedReadingsBooks()
  const toReadList = await db.getToReadBooks()
  const readingList = await db.getReadingBooks()
  res.render('index', { title: "Home Page", readingList, finishedList, toReadList })
}

const getReadingSection = (req, res) => {
  res.render('partials/reading')
}

const getFinishedSection = (req, res) => {
  res.render('partials/finished')
}

const getToReadSection = (req, res) => {
  res.render('partials/toread')
}


module.exports = {
  getIndexPage,
  getReadingSection,
  getFinishedSection,
  getToReadSection
}
