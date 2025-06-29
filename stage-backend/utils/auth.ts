import { RequestHandler } from "express"

export const ensureAdmin: RequestHandler = (req, res, next) => {
	if (req.headers.authorization !== process.env.ADMIN_KEY) {
		res.status(401).json({ error: 'Unauthorized' })
		return
	}
	next()
}