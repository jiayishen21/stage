import app from "../stage-backend/index"

// Export for Vercel
export default app

// Vercel serverless config
export const config = {
	api: {
		// Let Express handle the body parsing
		bodyParser: false,
	}
}