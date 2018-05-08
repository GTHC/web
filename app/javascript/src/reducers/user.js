const initialState = {
  data: {},
  isLoggedIn: false,
  isLoading: false,
  error: false,
  errorMessage: '',
}

const user = (state=initialState, action) => {
  switch(action.type) {
    case 'BEGIN_LOGIN': {
      return {
        ...state,
        isLoading: true,
      }
    }
    case 'FAILED_LOGIN': {
      return {
        ...initialState,
        error: true,
        errorMessage: action.payload.response.data.message,
        errorObject: action.payload,
      }
    }
    case 'END_LOGIN': {
      return {
        data: action.payload.data.data,
        isLoggedIn: true
      };
    }
    case 'BEGIN_LOGOUT': {
      return {
        ...state,
        isLoading: true,
      }
    }
    case 'FAILED_LOGOUT': {
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload,
      }
    }
    case 'END_LOGOUT': {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export default user;
