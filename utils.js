const fs = require('fs')

module.exports = {}

module.exports.articleList = (articles, authors) => {
  const ret = []
  for (const artId in articles) {
    const article = articles[artId]
    const author = authors[article.user]
    ret.push({
      title: article.title,
      user: `${author.last}, ${author.first}`,
      slug: module.exports.slugArticle(article),
      datetime: article.datetime,
    })
  }
  return ret
}

module.exports.slugAuthor = (author) => {
  return `${author.first.toLowerCase()}-${author.last.toLowerCase()}`.replace(/\s+/g, '-')
}

module.exports.slugArticle = (article) => {
  return article.title.toLowerCase().replace(/\s+/g, '-')
}

module.exports.articleRecords = (articles, authors) => {
  const ret = []
  for (const artId in articles) {
    const article = articles[artId]
    const author = authors[article.user]
    ret.push({
      title: article.title,
      user: `${author.last}, ${author.first}`,
      slug: module.exports.slugArticle(article),
      datetime: article.datetime,
      body: fs.readFileSync(`content/${article.body}`, 'utf8'),
    })
  }
  return ret
}
