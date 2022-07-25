import axios from 'axios';
import { Dispatch } from 'react';
import { API_POST_URL, Post, PostAction } from './PostTypes';

// Create Post
export const createPost = async (dispatch: Dispatch<PostAction>, formData: Post) => {
  try {
    const response = await axios.post(`${API_POST_URL}/create`, formData);
    if (response.data.hasOwnProperty('error')) {
      dispatch({
        type: 'CREATE_POST_ERROR',
        payload: response.data
      });
    }
    dispatch({
      type: 'CREATE_POST_SUCCESS',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
};
// Read Posts

// Read Post

// Update Post

// Delete Post

// Filter Posts
