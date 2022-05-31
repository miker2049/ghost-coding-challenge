const ENDPOINT = 'http://localhost:3000'
const ARTICLE_ID = 1

function formatComment(data){
    return `${data.username} says: ${data.text} -- ${data.upvotes} &#128420;`
}

//Takes comment data and returns a list element with its data
function renderComment(data){
    let el = document.createElement("li")
    el.innerHTML = formatComment(data)
    return el
}

// Takes an array of comment data and returns an ol element saturated with the comments
function renderAllComments(datas){
  
   document.querySelector("#comments-list").innerHTML = ''
   let list = document.createElement("ol")

    for(let i = 0; i<datas.length; i++){
       const thisEl = renderComment(datas[i])
        list.appendChild(thisEl)
    }
    document.querySelector("#comments-list").appendChild(list)
}

// async, returns a Promise with an array of comments
function fetchComments(){
   return fetch(ENDPOINT+"/api/comments?article="+ARTICLE_ID).then(res=>{
      return res.json()
   })
}


function insertComment(data){
    DBGLOBAL.push(data)
}

function render(){
    fetchComments().then(res=>{
        // if(DBGLOBAL.length>0){
        //     res = res.concat(DBGLOBAL)
        // }
      console.log(res)
        // res = res.sort((a,b)=> a.id - b.id)
        // renderAllComments(res)
    })
}

function submitComment(){
  let comment = document.querySelector('#comment-box')
  if(comment){
    console.log(comment.value)
    insertComment({
        id: 32,
        upvotes: 0,
        username: "chad",
        text: comment.value,
        replies: [],
        "in-reply-to": -1
    })
    render()
  }
}
render()
