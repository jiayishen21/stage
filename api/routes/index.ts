import { Router } from "express"
import { upload, all, one, del } from "../controllers/videoControllers"

const r = Router()

r.post("/upload", upload)
r.get("/videos", all)
r.get("/videos/:id", one)
r.delete("/videos/:id", del)

export default r
