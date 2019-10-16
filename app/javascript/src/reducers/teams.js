const initalState = {
  all: [], // all teams
  teamDropDownOptions: [], // dropdown data for sign up when choosing teams
  isLoading: false,
  error: false,
  errorMessage: '',
};

const teams = (state=initalState, action) => {
  switch(action.type) {
    // get all team data (used in sign up)
    case 'BEGIN_GET_TEAMS': {
      return {
        ...state,
        isLoading: true,
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

    case 'END_GET_TEAMS': {
      // this formats the teams into data that can be read by the Dropdown component in the TeamSignUp component
      const teamDropDownOptions = action.payload.data.map(
        (team) => {
          // having a serperate color variable rather than just saying team.tent_type avoids warnings although it would it still work
          const tentType = team.tent_type.toLowerCase();
          const color = (tentType.includes('black') ?
          'black' : (tentType.includes('blue') ?
          'blue' : null));
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
        all: action.payload.data,
        isLoading: false,
        teamDropDownOptions,
      };
    }
  }
  return state;
}

export default teams;
