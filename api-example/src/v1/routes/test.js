const Joi = require('@hapi/joi');
const controller = require('./../controllers/test')

module.exports = [
    {
        method: 'GET',
        path: '/test/success/{number}/{hash}',
        options: {
            handler: controller.success,
            description: 'Result',
            notes: ['Endpoint to user authenticate.'],
            validate: {
                params: Joi.object({
                    number: Joi.number().description('docker number').default(0).required(),
                    hash: Joi.string().description('hash to transaction').required(),
                })
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            description: 'Success',
                            schema: Joi.object({
                                statusCode: Joi.number(),
                                message: Joi.string(),
                            }).label('Result')
                        },
                        '500': {
                            description: 'Error: Internal Server Error',
                            schema: Joi.object({
                                statusCode: Joi.number(),
                                error: Joi.string(),
                                message: Joi.string()
                            }).label('Result')
                        }
                    }
                }
            },
            tags: ['api', 'v1'],
        }
    }]
