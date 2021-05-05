import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import apiPublic from "../api/publicApiActions";
import apiWithLogin from '../api/apiWithUserLogin';
import reducer from '../combineReducer';
import apiAdminActions from "../api/apiAdmin";



// const preloadedState = {
//     entities: {
//         signinOrRegister: {
//             userInfo: JSON.parse(localStorage.getItem('userInfo'))
//             ? 
//             JSON.parse(localStorage.getItem('userInfo'))
//             :
//             null
//         },
//     },
// };

export default function configStore(){
    return configureStore({
        reducer,
        //preloadedState,
        middleware: [
            ...getDefaultMiddleware(),apiPublic,apiWithLogin,apiAdminActions
        ]
    })
};

