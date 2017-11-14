const mongodb = require('mongodb');
const client =mongodb.MongoClient;
global.URL = global.URL || 'mongodb://localhost:27017/chatdb';

const pdb =client.connect(global.URL);

const posts = [];

const getPosts= (req,reply)=>{
    //reply(posts);
    const pPosts = pdb.then(db => {
        return db.collection('posts').find({}).project({_id:0}).toArray();
    });
    reply(pPosts) // reply knows to wait for promise to fulfill and deals with errors if necessary
};

const createPost = (req,reply)=>{
    //posts.push(req.payload);
    pdb.then(db=>{
        return db.collection('posts')
            .insert(req.payload)
    }).then(()=>{
        reply('Post created')
    }).catch(err =>{
        console.log(err)
        reply(err)
    });
};

module.exports = {
    getPosts,createPost,
};