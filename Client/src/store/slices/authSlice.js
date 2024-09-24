export const authSlice = (set) => ({
  userInfo: undefined, // Initial state for user info, set to undefined
  setUserInfo: (userInfo) => set(userInfo), // A method to update the userInfo state
});
