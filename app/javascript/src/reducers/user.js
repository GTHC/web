const initialState = {
  data: {},
  isLoggedIn: false,
  isLoading: false,
  error: false,
  errorMessage: '',
};

const user = (state=initialState, action) => {
  const beginState = {
    ...state,
    isLoading: true,
    error: false,
    errorMessage: '',
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

    case 'BEGIN_UPDATE_AVAIL': {
      return beginState;
    }

    case 'FAILED_UPDATE_AVAIL': {
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload.response.data.message,
      };
    }

    case 'END_UPDATE_AVAIL': {
      const data = state.data;
      data.user.availability = action.payload.data.data;
      return {
        ...state,
        isLoading: false,
        data,
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

    default: {
      return state;
    }
  }
};

export default user;
