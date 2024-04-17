import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/'; // Adjust this URL based on your actual backend server

// Function to retrieve data
export const fetchData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}matches/`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return null;
    }
};

// Function to send match data
export const postMatchData = async (matchData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}matches/`, matchData);
        return response.data;
    } catch (error) {
        console.error('Failed to post match data:', error);
        return null;
    }
};