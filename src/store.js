import auth from './reducers/auth/auth';
import admin from './reducers/admin/admin';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    auth,
    admin
  },
});
