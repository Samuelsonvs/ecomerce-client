import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import api from "../api/apiAction";
// import orderApi from "./cardApi";
import reducer from '../combineReducer';

const preloadedState = {
    entities: {
        signinOrRegister: {
            userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
        },
    },
};

export default function configStore(){
    return configureStore({
        reducer,
        preloadedState,
        middleware: [
            ...getDefaultMiddleware(),api,
        ]
    })
};