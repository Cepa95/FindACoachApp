export default {
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
  userEmail(state) {
    return state.userEmail;
  },
  didLogout(state) {
    return state.didLogout;
  },
};
