import { IPostState, PostAction } from './PostTypes';

export default (state: IPostState, action: PostAction) => {
  switch (action.type) {
    case 'CREATE_POST_SUCCESS':
      return {
        post: action.payload,
        ...state,
      }
    default:
      return state;
  }
}
