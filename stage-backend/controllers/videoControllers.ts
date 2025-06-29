import { RequestHandler } from "express"
import s3 from "../utils/s3"
import { dbOps } from "../database"
import crypto from "crypto"

const bucket = process.env.S3_BUCKET_NAME!

export const upload: RequestHandler = async (req, res) => {
  const { title, description } = req.body
  if (!title) { res.status(400).json({ error: 'Title required' }); return }
  const key = crypto.randomUUID()
  // const url = await s3.getSignedUrlPromise("putObject", { Bucket: bucket, Key: key, ContentType: "video/mp4", Expires: 60 })
  const url = 'lol'
  await dbOps.add({ key, title, description })
  res.json({ url, key })
}

export const all: RequestHandler = async (_req, res) => {
  res.json(await dbOps.all())
}

export const one: RequestHandler = async (req, res) => {
  console.log("DEBUG", req.params.id)
  const v = await dbOps.one(Number(req.params.id))
  if (v) res.json(v)
  else res.status(404).json({ error: 'Not found' })
}

export const del: RequestHandler = async (req, res) => {
  await dbOps.del(Number(req.params.id))
  res.json({ ok: true })
}
