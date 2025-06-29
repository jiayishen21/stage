import { Router } from "express"
import { upload, all, one, del } from "../controllers/videoControllers"
import { ensureAdmin } from "../utils/auth"

const r = Router()

r.post("/upload", ensureAdmin, upload)
r.delete("/videos/:id", ensureAdmin, del)
r.get("/videos", all)
r.get("/videos/:id", one)

export default r
