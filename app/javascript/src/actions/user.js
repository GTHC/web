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

const initiatePasswordReset = data =>
  crud({
    dispatch: {
      begin: "BEGIN_PASSWORD_RESET",
      fail: "FAILED_PASSWORD_RESET",
      end: "END_PASSWORD_RESET"
    },
    method: "POST",
    url: "/api/v1/user/forgot_password",
    data
  });

const changePasswordWithResetToken = data =>
  crud({
    dispatch: {
      begin: "BEGIN_PASSWORD_RESET",
      fail: "FAILED_PASSWORD_RESET",
      end: "END_PASSWORD_RESET"
    },
    method: "POST",
    url: "/api/v1/user/token_change_password",
    push: "/login",
    data
  });

const invalidEmailError = () => (
  { type: 'INVALID_EMAIL' }
)

const passwordTooShortError = () => (
  { type: 'PASSWORD_SHORT' }
)

const passwordMismatchError = () => (
  { type: 'PASSWORD_MISMATCH' }
)

const postAvatar = data =>
  crud({
    headers: { "Content-Type": "form-data" },
    dispatch: {
      begin: "BEGIN_POST_AVATAR",
      fail: "FAILED_POST_AVATAR",
      end: "END_POST_AVATAR"
    },
    method: "POST",
    url: "/api/v1/user/avatar",
    data
  });

const getResetPassword = () => (
  { type: 'GET_RESET_PASSWORD' }
);

export {
  updateUser,
  checkSession,
  postAvatar,
  initiatePasswordReset,
  getResetPassword,
  changePasswordWithResetToken,
  invalidEmailError,
  passwordTooShortError,
  passwordMismatchError
};
