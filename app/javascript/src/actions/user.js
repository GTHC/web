import crud from './utils/crud';

const updateUser = (id, data) => (
  crud({
    dispatch: {
      begin: 'BEGIN_UPDATE_USER',
      end: 'END_UPDATE_USER',
      fail: 'FAILED_UPDATE_USER',
    },
    method: 'PUT',
    url: `/api/v1/users/${id}`,
    data,
  })
);

export {
  updateUser,
};
