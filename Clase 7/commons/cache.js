const nodecache = require('node-cache');

const appCache = new nodecache({ stdTTL : 3599});

module.exports = appCache;
