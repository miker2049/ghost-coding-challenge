const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db'); // probably shouldn't hardcode this in the module.. but its MVP

module.exports = {
  async getComment(n) {
    return await new Promise((res, rej) => {
      db.get('SELECT user,article,comment_text,like_count FROM comments JOIN like_tallies ON comments.id = like_tallies.comment_id WHERE id = $id;',
        { $id: n },
        (err, row) => {
          console.log(row)
          res(JSON.stringify(row))
        })
    })
  },
  async getComments($article, $limit, $offset) {
    $limit = Math.max($limit, 1000) // other people have to use the db too!
    return await new Promise((res, rej) => {
      db.all('SELECT comments.id,user,article,comment_text,like_count FROM comments JOIN like_tallies ON comments.id = like_tallies.comment_id ' +
        ' WHERE article = $article AND comments.id > 0 LIMIT $limit OFFSET $offset',
        { $limit, $offset, $article }, (err, rows) => {
          res(rows)
        })
    })
  },
  async getCommentCount($article) {
    return await new Promise((res, rej) => {
      db.get('SELECT count(id) FROM comments WHERE article= $article', { $article }, (err, row) => {
        res(row)
      })
    })
  },
  async postComment($article, $user, $text, $replyTo) {
    return await new Promise((res, rej) => {
      db.run('INSERT INTO comments(user, article, comment_text, in_reply_to) VALUES ($user, $article, $text, $replyTo)', { $article, $user, $text, $replyTo }, function(err) {
        console.log(err)
        res({ msg: "comment added?" })
      })
    })
  },
  async likeComment(commentID, userID) {
    return await new Promise((res, rej) => {
      db.run('INSERT INTO likes(user, comment) VALUES ($user, $comment)', { $user: userID, $comment: commentID }, function(err) {
        res(this.lastID)
      })
    })
  }
}
