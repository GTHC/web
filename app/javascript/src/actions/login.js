import crud from './utils/crud';

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

// API actions

const getAllTeams = () => (
  crud({
    dispatch: {
      begin: 'BEGIN_GET_TEAMS',
      end: 'END_GET_TEAMS',
      fail: 'FAILED_GET_TEAMS',
    },
    method: 'GET',
    url: '/api/v1/teams'
  })
)

export {
  toggleLoginType,
  toggleDisableNext,
  updateUserInfo,
  updateTeamInfo,
  getAllTeams,
};
