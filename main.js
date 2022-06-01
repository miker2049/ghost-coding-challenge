const ENDPOINT = 'http://localhost:3000'
const ARTICLE_ID = 1
const USER_ID = 1

function formatComment(data) {
  console.log(data)
  return `${data.user} says: ${data.comment_text} -- <button onclick="console.log('hoop')" class="astext">${data.like_count} &#128420;</button> `
}

//Takes comment data and returns a list element with its data
function renderComment(data) {
  let el = document.createElement("li")
  el.innerHTML = formatComment(data)
  return el
}

// Takes an array of comment data and returns an ol element saturated with the comments
function renderAllComments(datas) {

  document.querySelector("#comments-list").innerHTML = ''
  let list = document.createElement("ol")

  for (let i = 0; i < datas.length; i++) {
    const thisEl = renderComment(datas[i])
    list.appendChild(thisEl)
  }
  document.querySelector("#comments-list").appendChild(list)
}

// async, returns a Promise with an array of comments
function fetchComments() {
  return fetch(ENDPOINT + "/api/comments?article=" + ARTICLE_ID).then(res => {
    return res.json()
  })
}


function insertComment(data) {
  return fetch(ENDPOINT + "/api/comment?article=" + ARTICLE_ID + "&username=chad",
    {
      method: "POST",
      headers: {
        "Content-Type": "text/plain"
      },
      body:  data.text
    }).then(res => {
      return res.json()
    })
}

function render() {
  return fetchComments().then(res => {
    // if(DBGLOBAL.length>0){
    //     res = res.concat(DBGLOBAL)
    // }
    // console.log(res)
    // res = res.sort((a,b)=> a.id - b.id)
    renderAllComments(res)
  })
}

function submitComment() {
  let comment = document.querySelector('#comment-box')
  if (comment) {
    insertComment({
      username: "chad",
      text: comment.value
    }).then(_=> render())
  }
}

function likeComment(id, uid){

}
render()
