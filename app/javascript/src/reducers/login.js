const initialState = {
  type: 'login', // login or signup
  signUpData: {
    name: '',
    email: '',
    team: '',
    teamID: null,
    tentType: '',
    tentNumber: '',
    isCaptain: false,
    password: '',
    passwordConfirmation: '',

    // default value is array of zeros
    availability: (new Array(7)).fill().map(() => (new Array(20).fill(2))),
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
  switch (action.type) {
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
    case 'SU_USER_INFO': {
      return {
        ...state,
        signUpData: {
          ...state.signUpData,
          name: action.payload.name,
          email: action.payload.email,
          password: action.payload.password,
          passwordConfirmation: action.payload.passwordConfirmation,
        },
      };
    }

    case 'SU_TEAM_INFO': {
      const teamID = !action.payload.isCaptain ?  action.payload.teamID : null;
      // if user is not a captain then the teamID that is coming from the payload
      // can be discarded since it won't be used. Otherwise, the teamID is important.
      return {
        ...state,
        signUpData: {
          ...state.signUpData,
          team: action.payload.team,
          teamID: teamID,
          tentType: action.payload.tentType,
          tentNumber: action.payload.tentNumber,
          isCaptain: action.payload.isCaptain,
          passcode: action.payload.passcode,
        },
      };
    }

    case 'SU_AVAIL': {
      return {
        ...state,
        signUpData: {
          ...state.signUpData,
          availability: action.payload.availability,
        },
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
          const color = (team.tent_type.toLowerCase().includes('black') ? 'black' : ( team.tent_type.includes('blue') ? 'blue' : null ));
          return {
            key: team.id,
            value: team.id,
            text: `${team.name}`,
            label: { color: color, empty: true, circular: true },
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
    // reset signup/login redux data when user login POST call is successful
    case 'END_LOGIN': {
      return initialState;
    }

    case 'CLEAR_ERROR': {
      return {
        ...state,
        error: false,
        errorMessage: '',
      };
    }
  }
  return state;
};

export default login;
