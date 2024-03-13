import { configureStore } from '@reduxjs/toolkit';
import idReducer from "./components/auth/Signup/Slice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    id:idReducer,
  },
});

export default store;