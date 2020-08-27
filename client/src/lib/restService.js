const axios = require('axios');

export const get = async (url) => {
  try {
    return axios.get(url);
  } catch (error) {
    console('err on url', url);
    return null;
  }
};

export const post = async (url, body) => {
  try {
    return axios.post(url, body);
  } catch (error) {
    console('err on url', url);
    return null;
  }
};
