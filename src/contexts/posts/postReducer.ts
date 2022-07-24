import { IPostState, PostAction } from './PostTypes';

export default (state: IPostState, action: PostAction): IPostState => {
  switch (action.type) {
    case 'NEW_POST_SUCCESS':
    case 'FETCH_ALL_POSTS':
        return {
        ...state,
        ...action.payload,
        loading: false
      }
    case 'NEW_POST_ERROR':
    default:
      return state;
  }
}
