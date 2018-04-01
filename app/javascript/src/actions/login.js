const toggleLoginType = (type) => {
  switch (type) {
    case 'login': {
      return {
        type: 'START_SIGNUP',
      };
    }
    case 'signup': {
      return {
        type: 'START_LOGIN',
      };
    }
  }
};

const toggleDisableNext = (val) => {
  return {
    type: 'SU_NEXT',
    payload: val,
  };
};

const updateUserInfo = (userInfo) => {
  return {
    type: 'SU_USER_INFO',
    payload: {
      email: userInfo.email,
      password: userInfo.password,
      passwordConfirmation: userInfo.passwordConfirmation,
    }
  };
}

const updateTeamInfo = (teamInfo) => {
  // TODO: Make sure store is getting appropriate tentType and tentNumber values
  return {
    type: 'SU_TEAM_INFO',
    payload: {
      name: teamInfo.name,
      team: teamInfo.team,
      tentType: teamInfo.tentType,
      tentNumber: teamInfo.tentNumber,
      isCaptain: teamInfo.isCaptain,
    }
  };
}

export {
  toggleLoginType,
  toggleDisableNext,
  updateUserInfo,
  updateTeamInfo,
};
