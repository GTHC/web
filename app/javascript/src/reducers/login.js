const initialState = {
  type: 'login', // login or signup
  signUpData: {
    name: '',
    email: '',
    team: '',
    tentType: '',
    tentNumber: '',
    isCaptain: false,
    password: '',
    passwordConfirmation: '',
  },
  disableNext: true, // disable next button for signup
};

const login = (state=initialState, action) => {
  switch(action.type) {
    // changing page type
    case 'START_LOGIN': {
      return {
        ...initialState,
        type: 'login',
      };
    }
    case 'START_SIGNUP': {
      return {
        ...initialState,
        type: 'signup',
      };
    }
    // SIGNUP (SU) actions
    case 'SU_USER_INFO': {
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
    case 'SU_NEXT': {
      return {
        ...state,
        disableNext: action.payload,
      };
    }
  }
  return state;
};

export default login;
