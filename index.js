'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
    port: 3000,
    host: 'localhost',
    routes: {
        cors: true,
        log :true
    }

    });

server.register({
    register: require('./plugins/posts'),
    options: {}
}, err =>{
    if (err){
        console.log(err);
    }
});


// URI encode transforms strings so they can work with a URL so changes unsupported characters
// server.route({
//     method: 'GET',
//     path: '/{name}',
//     handler: function (request, reply) {
//         reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
//     }
// });
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});

module.exports= server;
