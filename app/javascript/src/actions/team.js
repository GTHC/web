import crud from './utils/crud';

const getTeam = id => (
  crud({
    dispatch: {
      begin: 'BEGIN_GET_TEAM',
      end: 'END_GET_TEAM',
      fail: 'FAILED_GET_TEAM',
    },
    method: 'GET',
    url: `/api/v1/teams/${id}`,
  })
);

export {
  getTeam,
};
