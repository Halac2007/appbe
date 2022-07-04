import axios from 'axios'
import cheerio from 'cheerio'
import express from 'express'

const PORT = process.env.PORT || 5000
const app = express()

const URL = 'https://plo.vn/suc-khoe/dinh-duong/'

axios(URL)
  .then((res) => {
    const htmlData = res.data
    const $ = cheerio.load(htmlData)
    const articles = []

    $('.story', htmlData).each(function () {
      //<-- cannot be a function expression
      const title = $(this).text()
      const titleURL = $(this).find('a').attr('href')
      const img = $(this).find('img').attr('data-src')
      articles.push({
        title,
        titleURL,
        img,
      })
    })
    console.log(articles)
  })
  .catch((err) => console.error(err))

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
