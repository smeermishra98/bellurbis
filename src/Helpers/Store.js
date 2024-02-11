import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from "redux";
import { persistReducer , persistStore} from 'redux-persist'
import thunk from 'redux-thunk';
import CommonSlice from './CommonSlice';
import spinner from '../Components/spinner/SpinnerReducer';
const reducers = combineReducers({
  CommonSlice,
  spinner,
});

const persistConfig = {
  key: 'root',
  storage : AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, reducers);


const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware:[thunk]
});

;
export default store