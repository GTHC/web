const initialState = {
  data: {},
  isLoggedIn: false,
  isLoading: false,
  error: false,
  errorMessage: '',
  passwordResetSuccess: false,
};

const user = (state=initialState, action) => {
  const beginState = {
    ...state,
    isLoading: true,
    error: false,
    errorMessage: '',
    passwordResetSuccess: false,
  };
  switch (action.type) {
    // POST /login
    case 'BEGIN_LOGIN': {
      return beginState;
    }

    case 'FAILED_LOGIN': {
      return {
        ...initialState,
        isLoading: false,
        error: true,
        errorMessage: action.payload.response.data.message,
        errorObject: action.payload,
      };
    }

    case 'END_LOGIN': {
      return {
        ...state,
        data: action.payload.data.data,
        isLoading: false,
        isLoggedIn: true,
        error: true,
      };
    }

    // POST /api/v1/users or POST /api/v1/captains
    case 'BEGIN_SIGNUP': {
      return beginState;
    }

    case 'FAILED_SIGNUP': {
      return {
        ...initialState,
        isLoading: false,
        error: true,
        errorMessage: action.payload.response.data.message,
        errorObject: action.payload,
      };
    }

    case 'END_SIGNUP': {
      return {
        ...state,
        data: action.payload.data.data,
        isLoading: false,
        isLoggedIn: true,
        error: false,
        errorMessage: '',
      };
    }

    // POST /logout
    case 'BEGIN_LOGOUT': {
      return beginState;
    }

    case 'FAILED_LOGOUT': {
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload,
      };
    }

    case 'END_LOGOUT': {
      return initialState;
    }

    case 'CLEAR_ERROR': {
      return {
        ...state,
        error: false,
        errorMessage: '',
      };
    }

    // update TEAM with PUT /api/v1/team/:id
    case 'BEGIN_UPDATE_TEAM': {
      return beginState;
    }

    case 'FAILED_UPDATE_TEAM': {
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload.response.data.message,
      };
    }

    case 'END_UPDATE_TEAM': {
      const data = state.data;
      data.team = action.payload.data.data;
      return {
        ...state,
        data,
        isLoading: false,
      };
    }

    case 'BEGIN_UPDATE_USER': {
      return beginState;
    }

    case 'FAILED_UPDATE_USER': {
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload.response.data.message,
      };
    }

    case 'END_UPDATE_USER': {
      const data = state.data;
      data.user = action.payload.data.data;
      return {
        ...state,
        data,
        isLoading: false,
      };
    }

    // GET /api/v1/user/session
    case 'BEGIN_SESS_CHECK': {
      return beginState;
    }

    case 'FAILED_SESS_CHECK': {
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
      };
    }

    case 'END_SESS_CHECK': {
      return {
        ...state,
        isLoading: false,
        isLoggedIn: action.payload.data.status && state.data,
      };
    }

    case 'BEGIN_PASSWORD_RESET': {
      return beginState;

    }

    case 'FAILED_PASSWORD_RESET': {
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload.response.data.message,
      }
    }

    case 'END_PASSWORD_RESET': {
      return {
        ...state,
        isLoading: false,
        passwordResetSuccess: true,
      }
    }

    case 'GET_RESET_PASSWORD': {
      return {
        ...state,
        passwordResetSuccess: false,
      }
    }

    case 'INVALID_EMAIL': {
      return {
        ...state,
        error: true,
        errorMessage: "Please enter a valid email."
      }
    }

    case 'PASSWORD_SHORT': {
      return {
        ...state,
        error: true,
        errorMessage: "Password must be at least 6 characters long."
      }
    }

    case 'PASSWORD_MISMATCH': {
      return {
        ...state,
        error: true,
        errorMessage: "The passwords you entered do not match."
      }
    }

    // POST /ap1/v1/user/avatar
    case 'BEGIN_POST_AVATAR': {
      return beginState;
    }

    case 'FAILED_POST_AVATAR': {
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload.response.data.message,
      }
    }

    case 'END_POST_AVATAR': {
      const data = state.data;
      data.user.avatarURL = action.payload.data.data;
      return {
        ...state,
        isLoading: false,
        data,
      };
    }

    // POST /api/v1/user/availability
    case 'BEGIN_POST_AVAIL': {
      return beginState;
    }

    case 'FAILED_POST_AVAIL': {
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload.response.data.message,
      };
    }

    case 'END_POST_AVAIL': {
      const data = state.data;
      data.user.availabilities = action.payload.data.data;
      return {
        ...state,
        isLoading: false,
        data,
      };
    }

    // DELETE /api/v1/user/availability/:id
    case 'BEGIN_DELETE_AVAIL': {
      return beginState;
    }

    case 'FAILED_DELETE_AVAIL': {
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload.response.data.message,
      };
    }

    case 'END_DELETE_AVAIL': {
      const data = state.data;
      data.user.availabilities = action.payload.data.data;
      return {
        ...state,
        isLoading: false,
        data,
      };
    }

    default: {
      return state;
    }
  }
};

export default user;
