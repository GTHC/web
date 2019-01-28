import crud from './utils/crud';

const getTeam = id =>
  crud({
    dispatch: {
      begin: 'BEGIN_GET_TEAM',
      end: 'END_GET_TEAM',
      fail: 'FAILED_GET_TEAM',
    },
    method: 'GET',
    url: `/api/v1/teams/${id}`,
  });

const updateTeam = (id, data) =>
  crud({
    dispatch: {
      begin: 'BEGIN_UPDATE_TEAM',
      end: 'END_UPDATE_TEAM',
      fail: 'FAILED_UPDATE_TEAM',
    },
    method: 'PUT',
    url: `/api/v1/teams/${id}`,
    data,
  });

export { getTeam, updateTeam };
