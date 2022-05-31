const express = require('express')
const cors = require('cors')
const app = express();

app.use(cors())
const PORT = 3000

const controller = require('./db-controller')

// quick mock controller, (I miss typescript!)
const mockController = {
    async getComment(n){
        return JSON.stringify({msg: `You are getting comment with id ${n}`})
    },
    async getComments(article, min, max){
        return JSON.stringify({msg: `You are getting comments for article ${article} with ids between ${min} and ${max}`})
    },
    async getCommentCount(article){
        return JSON.stringify({msg: `You are getting the amount of comments for article with id ${article}`})
    },
    async postComment(article, username, text){
        return JSON.stringify({msg: `${username} has posted a comment to article with id ${id}, inputting the text "${text}"`})
    },
    async likeComment(n){
        return JSON.stringify(`Comment with id ${n} is given a new like`)
    }
}

app.set('port', 3000);

app.get('/api/comment/:id', async (req,res, next)=>{
    try{
        res.json(await controller.getComment(req.params.id));
    } catch (err) {
        next(err)
    }
})
app.get('/api/comments', async (req,res, next)=>{
    const limit = req.query.limit ?? 100
    const offset = req.query.offset ?? 0
    try{
        res.json(await controller.getComments(req.query.article,
                                                  limit,
                                                  offset));
    } catch (err) {
        next(err)
    }
})
app.get('/api/comment/count', async (req,res, next)=>{
    try{
        res.json(await controller.getCommentCount(req.query.article));
    } catch (err) {
        next(err)
    }
})
app.patch('/api/comment/like', async (req,res, next)=>{
    try{
        res.json(await controller.likeComment(req.query.id));
    } catch (err) {
        next(err)
    }
})
app.post('/api/comment', async (req,res, next)=>{
    try{
        res.json(await controller.getComment(req.query.article,
                                                req.query.username,
                                                req.body)); //body as just plaintext, is that ok?  Where should we sanitize?
    } catch (err) {
        next(err)
    }
})

// from old project
function onError(error) {
    if (error.name !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.message) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
        default:
            throw error;
    }
}

app.listen(PORT);
app.on('error', onError);
// server.on('listening', onListening);
