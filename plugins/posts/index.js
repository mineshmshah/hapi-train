'use strict';
const routes = require('./routes');
module.exports.register = (server, options, next)=>{
    server.route (routes);
    next()
};
module.exports.register.attributes = {
    name: 'myPlugin',
    version: '1.0.0'
};