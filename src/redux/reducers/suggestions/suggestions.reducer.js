import { getSuggestions } from '@redux/api/suggestion';
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
  isLoading: false,
}

export const suggestionsSlice = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {
    addToSuggestions: (state, action) => {
      const { isLoading, users } = action.payload;
      state.users = [...users];
      state.isLoading = isLoading; 
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSuggestions.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSuggestions.fulfilled, (state, action) => {
        state.isLoading = false
        if(action.payload?.users) {
          const { users } = action.payload;
          state.users = [...users];
        } else {
          state.users = [];
        }
      })
      .addCase(getSuggestions.rejected, (state) => {
        state.isLoading = false
      })
  }
});

export const suggestionsState = (state) => state.suggestions;

export const { addToSuggestions } = suggestionsSlice.actions;
export default suggestionsSlice.reducer;