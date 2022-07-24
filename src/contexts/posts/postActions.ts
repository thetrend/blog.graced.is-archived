import axios from 'axios';
import { Dispatch } from 'react';
import { API_POST_URL, Post, PostAction } from './PostTypes';

export const createPost = async (dispatch: Dispatch<PostAction>, formData: Post) => {
  try {
    const response = await axios.post(`${API_POST_URL}/create`, formData);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
