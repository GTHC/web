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

const updateShift = (id, data) => (
  crud({
    dispatch: {
      begin: 'BEGIN_PUT_SHIFT',
      end: 'END_PUT_SHIFT',
      fail: 'FAILED_PUT_SHIFT',
    },
    method: 'PUT',
    url: `/api/v1/shifts/${id}`,
    data,
  })
);

const createShift = data => (
  crud({
    dispatch: {
      begin: 'BEGIN_POST_SHIFT',
      end: 'END_POST_SHIFT',
      fail: 'FAILED_POST_SHIFT',
    },
    method: 'POST',
    url: '/api/v1/shifts',
    data,
  })
);

export {
  getAllShifts,
  updateShift,
  createShift,
};
