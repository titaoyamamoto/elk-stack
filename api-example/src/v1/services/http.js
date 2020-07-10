const axios = require('axios');

const get = async (url) => {
    return await axios.get(url);
}

module.exports = {
    get
}