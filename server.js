const express = require('express');
const app = express();
const port = process.env.PORT || 3002;
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const https = require('https');
const pgSession = require('connect-pg-simple')(session);
const { pool, isProduction } = require('./server/connectionConfig');
const { register } = require('./server/queries/register');
const { requestLogin } = require('./server/queries/requestLogin');
const { requestLogout } = require('./server/queries/requestLogout');
const { updateGenres } = require('./server/queries/updateGenres');
const { getGenres } = require('./server/queries/getGenres');
const { updateUserDetails } = require('./server/queries/updateUserDetails');
const { newThread } = require('./server/queries/newThread');
const { getThreads } = require('./server/queries/getThreads');
const { getThread } = require('./server/queries/getThread');
const { getComments } = require('./server/queries/getComments');
require('dotenv').config();

// middleware
app.set('trust proxy', true);
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
        httpOnly: false,
        maxAge: 86400000
    }
}));
if (isProduction) {
    app.use(express.static(path.join(__dirname, "client/build")));
};

// routes
app.post('/register', register);
app.post('/authenticate', requestLogin);
app.put('/user', updateUserDetails);
app.get('/genres', getGenres);
app.put('/userGenres', updateGenres);
app.get('/threads/:searchTerm', getThreads);
app.get('/thread/:threadId', getThread);
app.post('/thread', newThread);
app.get('/comments/:threadId', getComments);
app.get('/logout', requestLogout);

// catch all route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

// force https server in dev
if (isProduction) {
    app.listen(port, () => {
        console.log(`App is running on port ${port}.`);
    });
} else {
    const { credentials } = require('./server/httpsConfig');
    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(port, () => {
        console.log(`HTTPS app is running on port ${port}.`);
    });
};