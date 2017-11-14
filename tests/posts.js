const request = require('supertest');
const mocha = require('mocha');
const { assert } = require('chai');

const mongodb = require('mongodb');
const client =mongodb.MongoClient;
global.URL = 'mongodb://localhost:27017/testchatdb';

const pdb =client.connect(global.URL);


const newPost = {
    user: 'ME',
    message:'This is a message'
};


describe('posts',function(){
    before('delete db',()=>{
        return pdb.then(db =>{return db.dropDatabase()})
    });
    const server = require('../');
    after('stopserver',function(){
        server.stop();
        setTimeout(()=>process.exit(),100)
    });
 it('runs',function (callback) {
     request('localhost:3000')
         .get('/posts')
         .expect(res => {
             // Don't need the following line - checked with deepEqual
             //assert.equal(typeof res.body, 'object');
             assert.deepEqual(res.body, []);
         })
         .end(callback)
 });
    it('should let me add a post',function (callback) {
        request('localhost:3000')
            .post('/posts')
            .send(newPost)
            .expect(200)
            .end(callback)
    })
    it('should have new post',function (callback) {
        request('localhost:3000')
            .get('/posts')
            .expect(res => {
                assert.deepEqual(res.body, [newPost]);
            })
            .end(callback)
    })
    it('should show 400 when no user',function (callback) {
        request('localhost:3000')
            .post('/posts')
            .send({message:'hello'})
            .expect(400)
            .end(callback)
    })
});