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
}

export {
  toggleLoginType,
};
