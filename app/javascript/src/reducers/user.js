const initialState = {
  data: {},
  isLoggedIn: false,
}

const user = (state=initialState, action) => {
  switch(action.type) {
    case 'END_LOGIN': {
      return {
        data: action.payload.data,
        isLoggedIn: true
      };
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
