import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-6b6a7.firebaseio.com/'
})

export default instance;
