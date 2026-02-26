import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage"
import userSlice from "./userSlice";
import { version } from "react";
import {persistReducer} from "redux-persist"
const rootReducer = combineReducers({
    user:userSlice,
})
const persistConfig = {
    key:"root",
    storage,
    version:1,
}
const persistedReducer =  persistReducer(persistConfig,rootReducer)
export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleWare)=>{
        return getDefaultMiddleWare({serializableCheck:false})
    }
})
export const persistor = persistStore(store)