const http = require('./../services/http');

const Net = require('net');
const client = new Net.Socket();

client.connect({ host: 'logstash', port: '5400' }, function () {
    console.log('[*] Connected with TCP logstash.');
});

const apiName = 'elk-stack_api-example_';

const success = async (request, reply) => {
    let { number, hash } = request.params;

    try {

        if (number == 5)
            return reply.response(
                {
                    statusCode: 200,
                    message: 'Success!',
                }).code(200);

        let url = `http://${apiName + (number + 1)}:3001/v1/test/success/${number + 1}/${hash}`;
        console.log(url);
        await http.get(url);
        await client.write(JSON.stringify({ test: 'oi', url, hash }) + '\n');

        console.log('foi!');
        return reply.response(
            {
                statusCode: 200,
                message: 'Success!',
            }).code(200);

    } catch (ex) {
        console.log(ex);
    }
}


module.exports = {
    success
}