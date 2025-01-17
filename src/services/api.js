import axios from 'axios'; //uncomment for API Data
import { mockLiveScores } from './mockData';

const API_URL = 'https://api.cricapi.com/v1/cricScore';
const API_KEY = 'dab0c726-25b4-46ee-9b65-74ecb2286e63';
 //uncomment for API data

export const fetchLiveScores = async () => {
  
  try {
    const response = await axios.get(`${API_URL}?apikey=${API_KEY}`);
    if (response.data.status !== 'success') {
      console.error('API call failed or limit exceeded, using mock data.');
      return { data: mockLiveScores.data, isMock: true };
    }
    return { data: response.data.data, isMock: false };
  } catch (error) {
    console.error('Error fetching live scores, using mock data:', error);
    return { data: mockLiveScores.data, isMock: true };
  }
  //uncomment for API data

  // Using mock data for now
  //return { data: mockLiveScores.data, isMock: true };
};
