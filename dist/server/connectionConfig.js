"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProduction = exports.pool = void 0;
const dotenv_1 = require("dotenv");
const pg_1 = require("pg");
(0, dotenv_1.config)();
const isProduction = process.env.NODE_ENV === 'production';
exports.isProduction = isProduction;
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const pool = new pg_1.Pool({
    connectionString: isProduction
        ? process.env.DATABASE_URL
        : connectionString,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
});
exports.pool = pool;
