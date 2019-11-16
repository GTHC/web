import crud from './utils/crud';

const getPosts = () => (
  crud({
    dispatch: {
      begin: 'BEGIN_GET_POSTS',
      end: 'END_GET_POSTS',
      fail: 'FAILED_GET_POSTS',
    },
    method: 'GET',
    url: '/posts',
  })
);

export {
  getPosts
};
