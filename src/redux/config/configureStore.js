import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import api from "../api/generalApiAction";
import apiWithLogin from '../api/apiWithLogin';
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
            ...getDefaultMiddleware(),api,apiWithLogin
        ]
    })
};