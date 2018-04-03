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
  // API
  isLoading: false,
  teams: {}, // used for GET request for teams
  teamDropDownOptions: [],
  error: false,
  errorMessage: '',
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

    case '@@router/LOCATION_CHANGE': {
      return initialState;
    }

    // API actions for login
    case 'BEGIN_GET_TEAMS': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'END_GET_TEAMS': {
      // this formats the teams into data that can be read by the Dropdown component in the TeamSignUp component
      const teamDropDownOptions = action.payload.data.map(
        (team) => {
          // having a serperate color variable rather than just saying team.tent_type avoids warnings although it would it still work
          const color = (team.tent_type.includes('black') ? 'black' : ( team.tent_type.includes('blue') ? 'blue' : null ));
          return {
            key: team.id,
            value: team.id,
            text: `${team.tent_number} - ${team.name}`,
            label: {color: color, empty: true, circular: true },
          };
        }
      );
      return {
        ...state,
        teams: action.payload.data,
        isLoading: false,
        teamDropDownOptions,
      };
    }
    case 'FAILED_GET_TEAMS': {
      return {
        ...state,
        error: true,
        errorMessage: action.payload,
        isLoading: false,
      };
    }
  }
  return state;
};

export default login;
