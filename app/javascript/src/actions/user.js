import crud from './utils/crud';

const signupUser = (id, data) => (
  crud({
    dispatch: {
      begin: 'BEGIN_UPDATE_USER',
      end: 'END_UPDATE_USER_SIGNUP',
      fail: 'FAILED_UPDATE_USER',
    },
    method: 'PUT',
    push: '/app/',
    url: `/api/v1/users/signup/${id}`,
    data,
  })
)

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

const checkSession = () => (
  crud({
    dispatch: {
      begin: 'BEGIN_SESS_CHECK',
      fail: 'FAILED_SESS_CHECK',
      end: 'END_SESS_CHECK',
    },
    method: 'GET',
    url: '/api/v1/sessions',
  })
);

const postAvatar = data =>
  crud({
    headers: { 'Content-Type': 'form-data' },
    dispatch: {
      begin: 'BEGIN_POST_AVATAR',
      fail: 'FAILED_POST_AVATAR',
      end: 'END_POST_AVATAR',
    },
    method: 'POST',
    url: '/api/v1/user/avatar',
    data,
  });

/* Availability */

const putAvail = (id, data) =>
  crud({
    dispatch: {
      begin: 'BEGIN_POST_AVAIL',
      fail: 'FAILED_POST_AVAIL',
      end: 'END_POST_AVAIL',
    },
    method: 'PUT',
    url: `/api/v1/user/availability/${id}`,
    data,
  });

const postAvail = data =>
  crud({
    dispatch: {
      begin: 'BEGIN_POST_AVAIL',
      fail: 'FAILED_POST_AVAIL',
      end: 'END_POST_AVAIL',
    },
    method: 'POST',
    url: '/api/v1/user/availability',
    data,
  });

const deleteAvail = id =>
  crud({
    dispatch: {
      begin: 'BEGIN_DELETE_AVAIL',
      fail: 'FAILED_DELETE_AVAIL',
      end: 'END_DELETE_AVAIL',
    },
    method: 'DELETE',
    url: `/api/v1/user/availability/${id}`,
  });

const dragDropUpdate = newAvailabilities => ({
  type: 'AVAIL_DRAG_DROP',
  payload: newAvailabilities,
});

// POST /logout
const logout = () => (
  crud({
    dispatch: {
      begin: 'BEGIN_LOGOUT',
      end: 'END_LOGOUT',
      fail: 'FAILED_LOGOUT',
    },
    method: 'POST',
    url: '/logout',
  })
)

export {
  signupUser,
  updateUser,
  checkSession,
  postAvatar,
  putAvail,
  postAvail,
  deleteAvail,
  dragDropUpdate,
  logout,
};
