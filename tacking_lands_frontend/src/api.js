import axios from 'axios';

const api = axios.create({
  baseURL: 'https://talking-lands.onrender.com/api', 
});

export const fetchPoints = async () => {
  try {
    const response = await api.get('/points');
    return response.data;
  } catch (error) {
    console.error("Error fetching points:", error);
    throw error;
  }
};

export const fetchPolygons = async () => {
  try {
    const response = await api.get('/polygons');
    return response.data;
  } catch (error) {
    console.error("Error fetching polygons:", error);
    throw error;
  }
};

export default api;
