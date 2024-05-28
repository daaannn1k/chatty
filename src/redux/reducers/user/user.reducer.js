import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: '',
  profile: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { token, profile } = action.payload;
      state.token = token;
      state.profile = profile;
    },
    clearUser: () => {
     return initialState;
    },
    updateUserProfile: (state, action) => {
      state.profile = action.payload;
    }
  },
});

export const getState = (state) => state.user;

export const { addUser, clearUser, updateUserProfile } = userSlice.actions;

export default userSlice.reducer;