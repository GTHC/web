const initalState = {
  type: 'login', // login or signup
  signUpData: {
    name: '',
    email: '',
    team: '',
    tentType: '',
    tentNumber: null,
    isCaptain: false,
    password: '',
    passwordConfirmation: '',
  },
};

const login = (state=initialState, action) => {
  switch(action.type) {
    // changing page type
    case 'START_LOGIN': {
      return {
        ...state,
        type: 'login',
      };
    }
    case 'START_SIGNUP': {
      return {
        ...state,
        type: 'signup',
      };
    }
    // SIGNUP (SU) actions
    case 'SU_SIGN_CREDENTIALS': {
      return {
        ...state,
        signUpData: {
          ...state.signUpData,
          email: action.payload.email,
          password: action.payload.password,
          passwordConfirmation: action.payload.passwordConfirmation,
        }
      };
    }
    case 'SU_TEAM_INFO': {
      return {
        ...state,
        signUpData: {
          ...state.signUpData,
          name: action.payload.name,
          team: action.payload.team,
          tentType: action.payload.tentType,
          tentNumber: action.payload.tentNumber,
          isCaptain: action.payload.isCaptain,
        }
      };
    }
  }
  return state;
};
