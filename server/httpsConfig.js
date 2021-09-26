const fs = require('fs');
const { isProduction } = require('./connectionConfig');

// https credentials config
const privateKey = fs.readFileSync(isProduction ? '../suadkey.pem' : '/Users/josh.kent/key.pem', 'utf8');
const certificate = fs.readFileSync(isProduction ? '../suadcert.pem' : '/Users/josh.kent/cert.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate
};

module.exports = { credentials };