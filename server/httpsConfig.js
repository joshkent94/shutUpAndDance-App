const fs = require('fs');
require('dotenv').config();

// https credentials config
const privateKey = fs.readFileSync('~key.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');
const credentials = {
    key: privateKey,
    cert: certificate
};

module.exports = { credentials };