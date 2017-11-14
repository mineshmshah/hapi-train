const handlers = require('./handlers');
const Joi = require('joi');

module.exports =[{
    method: 'GET',
    path: '/',
    handler: function(request,reply){
        reply('Howdy!')
    }},
    {
        method: 'GET',
        path: '/posts',
        handler: handlers.getPosts,
    },
    {
        method: 'POST',
        path: '/posts',
        handler: handlers.createPost,
        config: {
            validate: {
                payload: Joi.object({
                    user: Joi.string().required(),
                    message: Joi.string().required(),
                    // channel: Joi.object({
                    //     id: Joi.number()
                    // })
                }).required()
            }
        }

    }

    ];