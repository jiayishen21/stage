import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import router from "./routes/index"
import { initDatabase } from "./database"

const app = express()
const port = process.env.PORT || 3000

// Init database
initDatabase().catch(console.error)

app.use(cors())
app.use(express.json())

app.use("/api", router)

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Stage API is running" })
})

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

export default app
