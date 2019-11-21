const initialState = {
  data: [],
  isLoading: false,
  error: false,
};

const posts = (state=initialState, action) => {
  switch (action.type) {
    case 'BEGIN_GET_POSTS': {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }

    case 'FAILED_GET_POSTS': {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }

    case 'END_GET_POSTS': {
      return {
        data: action.payload.data.data,
        isLoading: false,
        error: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default posts;
