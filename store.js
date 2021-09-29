import { applyMiddleware, createStore } from "redux"
import reduxThunk from 'redux-thunk'
import rootReducer from './redux/reducers/rootReducer'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

const middleWares = [reduxThunk]

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user']
};

const pReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(pReducer, applyMiddleware(...middleWares))
export const persistor = persistStore(store);