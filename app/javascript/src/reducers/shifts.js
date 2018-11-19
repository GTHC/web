const initialState = {
  data: [],
  isLoading: false,
  error: false,
  errorMessage: '',
};

const shifts = (state=initialState, action) => {
  const failedState = {
    ...state,
    isLoading: false,
    error: true,
  };

  const endState = {
    ...state,
    isLoading: false,
    error: false,
  };

  switch (action.type) {
    case 'BEGIN_GET_SHIFTS': {
      return {
        ...state,
        isLoading: true,
      };
    }

    case 'FAILED_GET_SHIFTS': {
      return {
        ...failedState,
        errorMessage: action.payload.message,
        errorObject: action.payload,
      };
    }

    case 'END_GET_SHIFTS': {
      return {
        ...endState,
        data: action.payload.data.data,
        responseObject: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default shifts;
