"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const https_1 = __importDefault(require("https"));
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
const connectionConfig_1 = require("./server/connectionConfig");
const userRoutes_1 = require("./server/routes/userRoutes");
const threadsRouter_1 = require("./server/routes/threadsRouter");
const commentsRouter_1 = require("./server/routes/commentsRouter");
const httpsConfig_1 = require("./server/httpsConfig");
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: __dirname + '/../.env' });
const pgSession = (0, connect_pg_simple_1.default)(express_session_1.default);
const app = (0, express_1.default)();
const port = process.env.PORT || 3002;
// middleware
app.set('trust proxy', true);
app.use((0, cors_1.default)({
    origin: ['https://localhost:3000', 'https://app.shutupanddance.io'],
    credentials: true,
    optionsSuccessStatus: 204,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use((0, express_session_1.default)({
    store: new pgSession({
        pool: connectionConfig_1.pool,
    }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    name: 'shut-up-and-dance',
    cookie: {
        sameSite: 'none',
        secure: true,
        httpOnly: false,
        maxAge: 86400000,
    },
}));
if (connectionConfig_1.isProduction) {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../client/build')));
}
// routes
app.use('/user', userRoutes_1.userRouter);
app.use('/threads', threadsRouter_1.threadsRouter);
app.use('/comments', commentsRouter_1.commentsRouter);
// catch all route
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../client/build/index.html'));
});
// force https server in dev
if (connectionConfig_1.isProduction) {
    app.listen(port, () => {
        console.log(`App is running on port ${port}.`);
    });
}
else {
    const httpsServer = https_1.default.createServer(httpsConfig_1.credentials, app);
    httpsServer.listen(port, () => {
        console.log(`HTTPS app is running on port ${port}.`);
    });
}
