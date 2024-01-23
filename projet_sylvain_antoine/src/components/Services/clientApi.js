import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://imr3-react.herokuapp.com',
});

export default apiClient;
