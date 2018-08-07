const fs = require('fs')
const moment = require('moment-timezone')

module.exports = {}

module.exports.articleList = (articles, authors) => {
  const ret = []
  for (const artId in articles) {
    const article = articles[artId]
    const author = authors[article.author]
    const body = fs.readFileSync(`content/${article.body}`, 'utf8')
    const publishTime = moment(article.datetime).tz('America/Denver')
    ret.unshift({
      title: article.title,
      author: `${author.last}, ${author.first}`,
      slug: module.exports.slugArticle(article),
      datetime: publishTime.format('llll zz'),
      summary: body.split(/\n/, 1)[0],
    })
  }
  return ret
}

module.exports.slugAuthor = (author) => {
  return `${author.last.toLowerCase()}-${author.first.toLowerCase()}`.replace(/\s+/g, '-')
}

module.exports.slugArticle = (article) => {
  return article.title.toLowerCase().replace(/\s+/g, '-')
}

module.exports.articleRecords = (articles, authors) => {
  const ret = []
  for (const artId in articles) {
    const article = articles[artId]
    const author = authors[article.author]
    const publishTime = moment(article.datetime).tz('America/Denver')
    ret.unshift({
      type: 'article',
      title: article.title,
      author,
      slug: module.exports.slugArticle(article),
      datetime: publishTime.format('LLLL zz'),
      body: fs.readFileSync(`content/${article.body}`, 'utf8'),
    })
  }
  return ret
}

module.exports.authorList = (authors) => {
  const ret = []
  for (const authorId in authors) {
    const author = authors[authorId]
    ret.push(Object.assign({}, author, {
      type: 'author',
      fullname: `${author.first} ${author.last}`,
      slug: module.exports.slugAuthor(author),
    }))
  }
  return ret
}

module.exports.authorRecords = (authors) => {
  const ret = []
  for (const authorId in authors) {
    const author = authors[authorId]
    ret.push(Object.assign({}, author, {
      type: 'author',
      fullname: `${author.first} ${author.last}`,
      slug: module.exports.slugAuthor(author),
      bio: fs.readFileSync(`content/${author.bio}`, 'utf8'),
    }))
  }
  return ret
}
