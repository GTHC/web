import crud from './utils/crud';

const getAllShifts = () => (
  crud({
    dispatch: {
      begin: 'BEGIN_GET_SHIFTS',
      end: 'END_GET_SHIFTS',
      fail: 'FAILED_GET_SHIFTS',
    },
    method: 'GET',
    url: '/api/v1/shifts',
  })
);

export {
  getShifts,
};
