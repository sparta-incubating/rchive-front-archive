import { client } from '@/utils/axios/clientAPI';
import axios from 'axios';

export const getTrackNames = async () => {
  try {
    const response = await client.get('/apis/v1/role/track');
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(err.response?.data);
    }
  }
};

export const getPostTypeNames = async () => {
  try {
    const response = await client.get('/apis/v1/posts/postType');
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(err.response?.data);
    }
  }
};
