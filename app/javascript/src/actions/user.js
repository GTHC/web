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

const updateAvailability = data => (
  crud({
    dispatch: {
      begin: 'BEGIN_UPDATE_AVAIL',
      fail: 'FAILED_UPDATE_AVAIL',
      end: 'END_UPDATE_AVAIL',
    },
    method: 'POST',
    url: '/api/v1/user/availability',
    data,
  })
);

const checkSession = () => (
  crud({
    dispatch: {
      begin: 'BEGIN_SESS_CHECK',
      fail: 'FAILED_SESS_CHECK',
      end: 'END_SESS_CHECK',
    },
    method: 'GET',
    url: '/api/v1/user/session',
  })
);

const initiatePasswordReset = data => {
  console.log(data);
  crud({
    dispatch: {
      begin: 'BEGIN_PASSWORD_RESET',
      fail: 'FAIL_PASSWORD_RESET',
      end: 'END_PASSWORD_RESET',
    },
    method: 'POST',
    url: '/api/v1/user/forgot_password',
    data,
  })
};

export {
  updateUser,
  updateAvailability,
  checkSession,
  initiatePasswordReset
};
