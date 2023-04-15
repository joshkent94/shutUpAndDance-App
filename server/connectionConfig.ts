import { Pool } from 'pg'
import * as dotenv from 'dotenv'
dotenv.config({ path: __dirname + '/../../.env' })

const isProduction = process.env.NODE_ENV === 'production'
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
const pool = new Pool({
    connectionString: isProduction
        ? process.env.DATABASE_URL
        : connectionString,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
})

export { pool, isProduction }
