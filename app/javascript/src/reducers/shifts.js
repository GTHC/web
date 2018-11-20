const initialState = {
  team_shifts: [],
  user_shifts: [],
  shift: {},
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
        team_shifts: action.payload.data.data.team_shifts,
        user_shifts: action.payload.data.data.user_shifts,
        responseObject: action.payload,
      };
    }

    case 'BEGIN_PUT_SHIFT': {
      return {
        ...state,
        isLoading: true,
      };
    }

    case 'FAILED_PUT_SHIFT': {
      return {
        ...failedState,
        errorMessage: action.payload.message,
        errorObject: action.payload,
      };
    }

    case 'END_PUT_SHIFT': {
      return {
        ...endState,
        // team_shifts: action.payload.data.data.team_shifts,
        // user_shifts: action.payload.data.data.user_shifts,
        // shift: action.payload.data.data.shift,
        responseObject: action.payload,
      };
    }

    case 'BEGIN_POST_SHIFT': {
      return {
        ...state,
        isLoading: true,
      };
    }

    case 'FAILED_POST_SHIFT': {
      return {
        ...failedState,
        errorMessage: action.payload.message,
        errorObject: action.payload,
      };
    }

    case 'END_POST_SHIFT': {
      return {
        ...endState,
        team_shifts: action.payload.data.data.team_shifts,
        user_shifts: action.payload.data.data.user_shifts,
        shift: action.payload.data.data.shift,
        responseObject: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default shifts;
