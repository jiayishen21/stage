import axios from 'axios';

// API calls
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export interface Video {
  id: number;
  key: string;
  url: string;
  title: string;
  description?: string;
  uploadedAt: string;
}

export const videoApi = {
  getAll: async (): Promise<Video[]> => {
    try {
      const response = await api.get('/videos');
      return response.data;
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }
  },
  getOne: async (id: number): Promise<Video> => {
    try {
      const response = await api.get(`/videos/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching video:', error);
      throw error;
    }
  },
};

export default api; 