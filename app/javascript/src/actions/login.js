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
      teamID: teamInfo.teamID,
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

// API call made when logging in
const login = (userData) => (
  crud({
    dispatch: {
      begin: 'BEGIN_LOGIN',
      end: 'END_LOGIN',
      fail: 'FAILED_LOGIN',
    },
    method: 'POST',
    url: '/login',
    push: '/app',
    data: userData
  })
)

const logout = () => (
  crud({
    dispatch: {
      begin: 'BEGIN_LOGOUT',
      end: 'END_LOGOUT',
      fail: 'FAILED_LOGOUT',
    },
    method: 'POST',
    url: '/logout',
    push: '/login'
  })
)

// API call made for user signing up with existing team
const signup = (userData) => (
  crud({
    dispatch: {
      begin: 'BEGIN_SIGNUP',
      end: 'END_SIGNUP',
      fail: 'FAILED_SIGNUP',
    },
    method: 'POST',
    url: '/api/v1/users',
    push: '/app',
    data: userData
  })
);


// API call made for user signing up with a new team
const signupNewTeam = (userData) => (
  crud({
    dispatch: {
      begin: 'BEGIN_SIGNUP',
      end: 'END_SIGNUP',
      fail: 'FAILED_SIGNUP',
    },
    method: 'POST',
    url: '/api/v1/captains',
    push: '/app',
    data: userData
  })
);


export {
  toggleLoginType,
  toggleDisableNext,
  updateUserInfo,
  updateTeamInfo,
  getAllTeams,
  login,
  logout,
  signup
};
