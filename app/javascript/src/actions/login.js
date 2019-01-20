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
    payload: userInfo,
  };
}

const updateTeamInfo = (teamInfo) => {
  return {
    type: 'SU_TEAM_INFO',
    payload: {
      team: teamInfo.team,
      teamID: teamInfo.teamID,
      tentType: teamInfo.tentType,
      isCaptain: teamInfo.isCaptain,
      passcode: teamInfo.passcode,
    },
  };
};

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
/**
 * @param  {[Object]} userData
 * {
 *  email: string
 *  password: string
 * }
 */
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
    push: '/login',
  })
)

// API call made for user signing up with existing team
/**
 * @param  {[Object]} userData
 * {
 *  name: string
 *  email: string
 *  password: string
 *  password_confirmation: string
 *  team_id: integer
 * }
 */
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
    data: userData,
  })
);

// API call made for user signing up with a new team
/**
 * @param  {[Object]} userData
 * {
 *  name: string
 *  email: string
 *  password: string
 *  password_confirmation: string
 *  team_name: string,
 *  tent_type: string (black, dblack, blue, dblue, or white)
 *  passcode: string,
 *  phone: string,
 * }
 */
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
    data: userData,
  })
);

const clearError = () => ({
  type: 'CLEAR_ERROR',
});

export {
  toggleLoginType,
  toggleDisableNext,
  updateUserInfo,
  updateTeamInfo,
  getAllTeams,
  login,
  logout,
  signup,
  signupNewTeam,
  clearError,
};
