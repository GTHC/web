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

    // update TEAM with PUT /api/v1/team/:id
    case 'BEGIN_UPDATE_TEAM': {
      return {
        ...state,
        isLoading: true,
        error: false,
        errorMessage: '',
      };
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
      return {
        ...state,
        data: action.payload.data.data,
        isLoading: false,
      };
    }

    case 'END_SESS_CHECK': {
      const response = action.payload.data
      return {
        ...state,
        data: response.data.team,
      }
    }

    default: {
      return state;
    }
  }
};

export default team;
