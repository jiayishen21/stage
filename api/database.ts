import sqlite3 from 'sqlite3'

// Create database connection
const db = new sqlite3.Database('./stage.db')

const run = (sql: string, params: any[] = []): Promise<{ lastID: number; changes: number }> => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) {
        reject(err)
      } else {
        resolve({ lastID: this.lastID, changes: this.changes })
      }
    })
  })
}

const get = (sql: string, params: any[] = []): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err)
      } else {
        resolve(row)
      }
    })
  })
}

const all = (sql: string, params: any[] = []): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows || [])
      }
    })
  })
}

// Init database tables
export const initDatabase = async (): Promise<void> => {
  try {
    await run(`
      CREATE TABLE IF NOT EXISTS videos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT,
        url TEXT,
        title TEXT,
        description TEXT,
        uploadedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Failed to initialize database:', error)
    throw error
  }
}

export interface Video {
  id: number
  key: string
  url: string
  title: string
  description?: string
  uploadedAt: string
}

export const dbOps = {
  add: (v: {key:string,url:string,title:string,description?:string}) => run('INSERT INTO videos (key,url,title,description) VALUES (?,?,?,?)',[v.key,v.url,v.title,v.description]),
  all: () => all('SELECT * FROM videos ORDER BY uploadedAt DESC'),
  one: (id:number) => get('SELECT * FROM videos WHERE id=?',[id]),
  del: (id:number) => run('DELETE FROM videos WHERE id=?',[id])
}

// Close DB on exit
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err)
    } else {
      console.log('Database connection closed')
    }
    process.exit(0)
  })
})

export default db 