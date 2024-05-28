import { createSlice } from '@reduxjs/toolkit';
import { uniqBy } from 'lodash';

import checkIcon from '@assets/images/check.svg';
import errorIcon from '@assets/images/error.svg';
import infoIcon from '@assets/images/info.svg';
import warningIcon from '@assets/images/warning.svg';

const initialState = {
  list: [],
};

const toastIcons = [
  { success: checkIcon, color: '#5cb85c' },
  { error: errorIcon, color: '#d9534f' },
  { info: infoIcon, color: '#5bc0de' },
  { warning: warningIcon, color: '#f0ad4e' },
]

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const { message, type } = action.payload;
      const toast = toastIcons.find((toast) => toast[type]);
      const toastItem = {
        id: state.length,
        description: message,
        type,
        icon: toast[type],
        backgroundColor: toast.color
      };
      state.list.unshift(toastItem);
      state.list = [...uniqBy(state.list, 'description')];
    },
    clearNotification: (state) => {
      state.list = [];
      
    }
  },
});

export const notificationsState = (state) => state.notifications;

export const { addNotification, clearNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;