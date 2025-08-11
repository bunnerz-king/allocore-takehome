import axios from 'axios';

export const API_SERVER = 'http://localhost:4000/'
export const API_URL = 'http://localhost:4000/api/';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getRootbeer = async(params) => {
    const response = await api.get('/drinks', {
        params: params
    });
    const content = response.data;
    return content;
}

export const getImages = async(id) => {
    const response = await api.get(`/drinks/${id}/pictures`);
    const content = response.data;
    return content;
}

export const createRootbeer = async(body) => {
    const response = await api.post(`/drinks`, body);
    const content = response.data;
    return content;
}

export const uploadImage = async(id, file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post(`/drinks/${id}/pictures`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
   });
    const content = response.data;
    console.log(content);
    return content;
}

export const createReview = async(id, body) => {

    const response = await api.post(`/drinks/${id}/reviews`, body);
    const content = response.data;
    console.log(content);
    return content;
}

export const getReviews = async(id, params = {offset: 0, length: 10}) => {

    const response = await api.get(`/drinks/${id}/reviews`, {
      params: params
    });
    const content = response.data;
    console.log(content);
    return content;
}