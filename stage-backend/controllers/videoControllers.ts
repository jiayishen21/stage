import { RequestHandler } from "express"
import { dbOps } from "../database"
import crypto from "crypto"

const bucket = process.env.S3_BUCKET_NAME!

export const upload: RequestHandler = async (req, res) => {
  const { title, description } = req.body
  if (!title) {
    res.status(400).json({ error: 'Title required' });
    return
  }
  const key = crypto.randomUUID()
  const { lastID, changes } = await dbOps.add({ key, title, description })
  res.json({ id: lastID, changes })
}

export const del: RequestHandler = async (req, res) => {
  await dbOps.del(Number(req.params.id))
  res.json({ ok: true })
}

export const all: RequestHandler = async (_req, res) => {
  res.json(await dbOps.all())
}

export const one: RequestHandler = async (req, res) => {
  const v = await dbOps.one(Number(req.params.id))
  if (v) res.json(v)
  else res.status(404).json({ error: 'Not found' })
}
