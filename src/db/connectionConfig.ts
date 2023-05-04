import { Pool } from 'pg'

const pool = new Pool({
    connectionString:
        process.env.NODE_ENV === 'production'
            ? process.env.DATABASE_URL + '?sslmode=require'
            : process.env.DATABASE_URL,
})

export { pool }
