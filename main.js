function formatComment(data){
    return `${data.username} says: ${data.text}`
}


//Takes comment data and returns a list element with its data
function renderComment(data){
    let el = document.createElement("li")
    el.innerHTML = formatComment(data)
    return el
}

// Takes an array of comment data and returns an ol element saturated with the comments
function renderAllComments(datas){
   let list = document.createElement("ol")
    for(let i = 0; i<datas.length; i++){
       const thisEl = renderComment(datas[i])
        list.appendChild(thisEl)
    }
    document.body.appendChild(list)
}

// async, returns a Promise with an array of comments
function fetchComments(){
   return fetch("mock-comments.json").then(res=>{
      return res.json()
   })
}

fetchComments().then(res=>renderAllComments(res))
