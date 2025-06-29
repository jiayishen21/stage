const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testAPI() {
  console.log('🧪 Testing Simplified Stage API...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check passed:', healthResponse.data);
    console.log('');

    // Test getting videos (should be empty initially)
    console.log('2. Testing get videos endpoint...');
    const videosResponse = await axios.get(`${BASE_URL}/api/videos`);
    console.log('✅ Get videos passed:', videosResponse.data);
    console.log('');

    // Test presigned URL generation
    console.log('3. Testing video upload endpoint...');
    const uploadResponse = await axios.post(`${BASE_URL}/api/upload`, {
      title: 'Test Speech Prompt',
      description: 'A test prompt for API testing'
    });
    console.log('✅ Upload endpoint passed');
    console.log('Generated key:', uploadResponse.data.key);
    console.log('Video ID:', uploadResponse.data.video.id);
    console.log('');

    // Test getting specific video
    console.log('4. Testing get specific video...');
    const videoId = uploadResponse.data.video.id;
    const videoResponse = await axios.get(`${BASE_URL}/api/videos/${videoId}`);
    console.log('✅ Get specific video passed:', videoResponse.data.title);
    console.log('');

    console.log('🎉 All API tests passed!');
    console.log('\n📝 API Endpoints:');
    console.log('   POST /api/upload - Upload new video');
    console.log('   GET /api/videos - Get all videos');
    console.log('   GET /api/videos/:id - Get specific video');
    console.log('   DELETE /api/videos/:id - Delete video');

  } catch (error) {
    console.error('❌ API test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  testAPI();
}

module.exports = testAPI; 