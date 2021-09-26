const fs = require('fs');

// https credentials config
const privateKey = fs.readFileSync('/Users/josh.kent/key.pem', 'utf8');
const certificate = fs.readFileSync('/Users/josh.kent/cert.pem', 'utf8');
const credentials = {
    key: privateKey,
    cert: certificate
};

module.exports = { credentials };