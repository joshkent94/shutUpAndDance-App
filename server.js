const express = require('express');
const app = express();
const port = process.env.PORT || 3002;
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const https = require('https');
const pgSession = require('connect-pg-simple')(session);
const { pool, isProduction } = require('./server/connectionConfig');
const { userRouter } = require('./server/routes/userRoutes');
const { threadsRouter } = require('./server/routes/threadsRouter');
const { commentsRouter } = require('./server/routes/commentsRouter');
require('dotenv').config();

// middleware
app.set('trust proxy', true);
app.use(
  cors({
    origin: ["https://localhost:3000", "https://app.shutupanddance.io"],
    credentials: true,
    optionsSuccessStatus: 204,
  })
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
app.use('/user', userRouter);
app.use('/threads', threadsRouter);
app.use('/comments', commentsRouter);

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