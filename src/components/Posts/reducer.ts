import { PostTypes } from '~COMPONENTS/Posts';

export default (state: PostTypes.PostState, action: PostTypes.PostAction): PostTypes.PostState => {
  switch (action.type) {
    case 'CREATE_POST_SUCCESS':
      return {
        post: action.payload.post,
        ...state,
      }
    default:
      return state;
  }
}
