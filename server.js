const fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();
const port = process.env.PORT || 3002;
const cors = require('cors');
const session = require('express-session');
const { pool } = require('./connectionConfig');
const pgSession = require('connect-pg-simple')(session);
const { register } = require('./queries/register');
const { requestLogin } = require('./queries/requestLogin');
const { requestLogout } = require('./queries/requestLogout');
const { getUserDetails } = require('./queries/getUserDetails');
const { updateGenres } = require('./queries/updateGenres');
const { getGenres } = require('./queries/getGenres');
require('dotenv').config();

const privateKey = fs.readFileSync(process.env.SSL_KEY_FILE, 'utf8');
const certificate = fs.readFileSync(process.env.SSL_CRT_FILE, 'utf8');
const credentials = {
    key: privateKey,
    cert: certificate
};

app.use(
  cors({
    origin: "https://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 204,
  }),
);
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(session({
    store: new pgSession({
        pool: pool
    }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    name: 'shut-up-and-dance',
    cookie: {
        sameSite: 'none',
        secure: true,
        httpOnly: false
    }
}));

app.get('/user', getUserDetails);
app.get('/genres', getGenres);
app.get('/logout', requestLogout);
app.post('/authenticate', requestLogin);
app.post('/register', register);
app.put('/user', updateGenres);

// ensures the server runs with a HTTPS connection
// which means cookies can be sent to the browser
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(port, () => {
    console.log(`App is running on port ${port}.`);
});