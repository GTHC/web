import crud from './utils/crud';

const toggleDisableNext = (val) => ({
  type: 'SU_NEXT',
  payload: val,
});

const updateUserInfo = (userInfo) => ({
  type: 'SU_USER_INFO',
  payload: userInfo,
});

const updateTeamInfo = (teamInfo) => ({
  type: 'SU_TEAM_INFO',
  payload: {
    team: teamInfo.team,
    teamID: teamInfo.teamID,
    tentType: teamInfo.tentType,
    isCaptain: teamInfo.isCaptain,
    passcode: teamInfo.passcode,
  },
});


const updateAvailInfo = availabilities => ({
  type: 'SU_AVAIL_INFO',
  payload: availabilities,
});

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

const clearError = () => ({
  type: 'CLEAR_ERROR',
});

export {
  toggleDisableNext,
  updateUserInfo,
  updateTeamInfo,
  updateAvailInfo,
  getAllTeams,
  logout,
  clearError,
};
