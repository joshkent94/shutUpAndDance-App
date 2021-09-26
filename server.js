const express = require('express');
const app = express();
const port = process.env.PORT || 3002;
const cors = require('cors');
const session = require('express-session');
const { pool, isProduction } = require('./server/connectionConfig');
const pgSession = require('connect-pg-simple')(session);
const { register } = require('./server/queries/register');
const { requestLogin } = require('./server/queries/requestLogin');
const { requestLogout } = require('./server/queries/requestLogout');
const { getUserDetails } = require('./server/queries/getUserDetails');
const { updateGenres } = require('./server/queries/updateGenres');
const { getGenres } = require('./server/queries/getGenres');
const https = require('https');
require('dotenv').config();

// middleware
app.use(
  cors({
    origin: ["https://localhost:3000", "https://shut-up-and-dance.herokuapp.com"],
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
if (isProduction) {
    app.use(express.static("client/build"));
};

// routes
app.get('/user', getUserDetails);
app.get('/genres', getGenres);
app.get('/logout', requestLogout);
app.post('/authenticate', requestLogin);
app.post('/register', register);
app.put('/user', updateGenres);

// runs http server in production and https server in dev
if (isProduction) {
    app.listen(port, () => {
        console.log(`App is running on port ${port}.`);
    });
} else {
    const { credentials } = require('./server/httpsConfig');
    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(port, () => {
        console.log(`HTTPS App is running on port ${port}.`);
    });
};