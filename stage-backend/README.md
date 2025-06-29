# Stage - Simple Video Management API

A simplified backend API for managing speech prompt videos. Users can upload videos to S3 and retrieve them for playback.

## Features

- **Video Upload**: Upload videos to AWS S3 with presigned URLs
- **Video Management**: Get all videos, get specific video, delete videos
- **Database Storage**: SQLite database for video metadata
- **Cloud Storage**: AWS S3 integration for video files

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: SQLite3
- **Cloud Storage**: AWS S3
- **Deployment**: Vercel

## Setup

### Prerequisites

- Node.js (v16 or higher)
- AWS S3 bucket with proper permissions
- AWS credentials

### Installation

1. Install dependencies:

   ```bash
   cd api
   npm install
   ```

2. Set up environment variables:

   ```bash
   cp env.example .env
   ```

   Edit `.env` with your AWS credentials and S3 bucket name.

3. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3000`

## API Endpoints

### Health Check

- `GET /health` - Check if the API is running

### Video Management

#### Upload Video

- `POST /api/upload`
- **Body**:
  ```json
  {
    "title": "Speech Prompt Title",
    "description": "Optional description"
  }
  ```
- **Response**:
  ```json
  {
    "url": "presigned_s3_url",
    "key": "videos/uuid.mp4",
    "video": {
      "id": 1,
      "key": "videos/uuid.mp4",
      "url": "https://bucket.s3.amazonaws.com/videos/uuid.mp4",
      "title": "Speech Prompt Title",
      "description": "Optional description",
      "uploadedAt": "2024-01-01T00:00:00.000Z"
    }
  }
  ```

#### Get All Videos

- `GET /api/videos`
- **Response**:
  ```json
  [
    {
      "id": 1,
      "key": "videos/uuid.mp4",
      "url": "https://bucket.s3.amazonaws.com/videos/uuid.mp4",
      "title": "Speech Prompt Title",
      "description": "Description",
      "uploadedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
  ```

#### Get Specific Video

- `GET /api/videos/:id`
- **Response**: Single video object

#### Delete Video

- `DELETE /api/videos/:id`
- **Response**: `{ "message": "Video deleted successfully" }`

## Database Schema

### Videos Table

- `id` (INTEGER, PRIMARY KEY)
- `key` (TEXT, UNIQUE) - S3 object key
- `url` (TEXT) - Full S3 URL
- `title` (TEXT) - Video title
- `description` (TEXT) - Video description
- `uploadedAt` (DATETIME) - Upload timestamp

## Usage Flow

1. **Upload a Video**:

   - Call `POST /api/upload` with video metadata
   - Upload video file to the returned presigned URL
   - Video is automatically saved to database

2. **Get Videos**:

   - Call `GET /api/videos` to get all videos
   - Call `GET /api/videos/:id` to get specific video

3. **Delete Video**:
   - Call `DELETE /api/videos/:id` to remove video

## Environment Variables

- `AWS_REGION` - AWS region (e.g., us-east-1)
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `S3_BUCKET_NAME` - S3 bucket name for video storage
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

## Testing

Run the test script to verify API functionality:

```bash
npm run test-api
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
