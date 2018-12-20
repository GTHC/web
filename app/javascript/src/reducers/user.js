const initialState = {
  data: {},
  isLoggedIn: false,
  isLoading: false,
  error: false,
  errorMessage: '',
};

const user = (state=initialState, action) => {
  switch (action.type) {
    // POST /login
    case 'BEGIN_LOGIN': {
      return {
        ...state,
        isLoading: true,
      };
    }

    case 'FAILED_LOGIN': {
      return {
        ...initialState,
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
      return {
        ...state,
        isLoading: true,
      };
    }

    case 'FAILED_SIGNUP': {
      return {
        ...initialState,
        error: true,
        errorMessage: action.payload.response.data.message,
        errorObject: action.payload,
      };
    }

    case 'END_SIGNUP': {
      return {
        ...state,
        data: action.payload.data.data,
        isLoggedIn: true,
        error: false,
        errorMessage: '',
      };
    }

    // POST /logout
    case 'BEGIN_LOGOUT': {
      return {
        ...state,
        isLoading: true,
      };
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

    default: {
      return state;
    }
  }
};

export default user;
