const initialState = {
  data: {},
  isLoading: false,
  error: false,
  errorMessage: '',
};

const team = (state=initialState, action) => {
  switch (action.type) {
    case 'BEGIN_GET_TEAM': {
      return {
        ...state,
        isLoading: true,
      };
    }

    case 'FAILED_GET_TEAM': {
      return {
        ...state,
        error: true,
        errorMessage: action.payload.message,
        errorObject: action.payload,
      };
    }

    case 'END_GET_TEAM': {
      return {
        ...initialState,
        data: action.payload.data,
      };
    }

    default: {
      return state;
    }
  }
};

export default team;
