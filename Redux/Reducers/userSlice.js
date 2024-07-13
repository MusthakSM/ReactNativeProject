import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserEmail(state, action) {
      state.email = action.payload;
      // Save email to AsyncStorage
      AsyncStorage.setItem('userEmail', action.payload);
    },
    clearUserEmail(state) {
      state.email = '';
      // Remove email from AsyncStorage
      AsyncStorage.removeItem('userEmail');
    },
  },
});

export const { setUserEmail, clearUserEmail } = userSlice.actions;
export default userSlice.reducer;
