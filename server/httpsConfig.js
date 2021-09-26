const fs = require('fs');

// https credentials config
const privateKey = fs.readFileSync(process.env.SSL_KEY_FILE, 'utf8');
const certificate = fs.readFileSync(process.env.SSL_CRT_FILE, 'utf8');
const credentials = {
    key: privateKey,
    cert: certificate
};

module.exports = { credentials };