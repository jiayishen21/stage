import { Pool } from 'pg'

// Supabase connection config for serverless
const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
  // Required for Supabase
  ssl: {
    rejectUnauthorized: false
  },
  // Serverless-optimized settings
  // Only 1 connection per function instance
  max: 1,
  // Close idle connections after 30 seconds
  idleTimeoutMillis: 30000,
  // Close connections that are idle for 5 seconds
  connectionTimeoutMillis: 5000,
})

const run = async (sql: string, params: any[] = []): Promise<{ lastID: number; changes: number }> => {
  const client = await pool.connect()
  try {
    const result = await client.query(sql, params)
    return { lastID: result.rows[0]?.id || 0, changes: result.rowCount || 0 }
  } finally {
    client.release()
  }
}

const get = async (sql: string, params: any[] = []): Promise<any> => {
  const client = await pool.connect()
  try {
    const result = await client.query(sql, params)
    return result.rows[0] || null
  } finally {
    client.release()
  }
}

const all = async (sql: string, params: any[] = []): Promise<any[]> => {
  const client = await pool.connect()
  try {
    const result = await client.query(sql, params)
    return result.rows || []
  } finally {
    client.release()
  }
}

export interface Video {
  id: number
  created_at: string
  key: string
  title: string
  description?: string
}

export const dbOps = {
  add: (v: { key: string, title: string, description?: string }) => run(
    'INSERT INTO videos (key,title,description) VALUES ($1,$2,$3)',
    [v.key, v.title, v.description]),
  all: () => all('SELECT * FROM videos ORDER BY created_at DESC'),
  one: (id: number) => get('SELECT * FROM videos WHERE id=$1', [id]),
  del: (id: number) => run('DELETE FROM videos WHERE id=$1', [id])
}

export default pool
