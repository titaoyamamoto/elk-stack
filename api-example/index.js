const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');

const Package = require('./package');
const v1Routes = require('./src/v1/routes');

const prefixer = (routeArray, apiPrefix) => {
    return routeArray.map(route => {
        route.path = `${apiPrefix}${route.path}`;
        return route;
    });
};

(async () => {

    const server = await new Hapi.Server({
        host: '0.0.0.0',
        port: process.env.PORT || 3000,
    });

    const swaggerOptions = {
        info: {
            title: 'User - API Documentation',
            version: Package.version,
        },
        pathPrefixSize: 2,
        securityDefinitions: {
            'jwt': {
                'type': 'apiKey',
                'name': 'Authorization',
                'in': 'header'
            }
        },
        security: [{ 'jwt': [] }],
        // documentationPage: process.env.NODE_ENV !== 'production'
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        },
    ]);

    let routes = prefixer(v1Routes, '/v1');
    server.route(routes);

    try {
        await server.start();
        console.log('Server running at:', server.info.uri);
    } catch (err) {
        console.log(err);
    }

})();