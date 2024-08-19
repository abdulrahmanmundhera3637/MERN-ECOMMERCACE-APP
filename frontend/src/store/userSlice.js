import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Export action creators from userSlice
export const { setUserDetails } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
