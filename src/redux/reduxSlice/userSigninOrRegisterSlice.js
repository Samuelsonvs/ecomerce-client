import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../api/api';

const slice = createSlice({
    name: 'userSigninorRegister',
    initialState: {
        userInfo: null,
        loading: false,
        lastFetch: null,
        error: null
    },

    reducers: {
        userSigninRequest: (state, action) => {
            state.loading = true
        },

        userSigninSuccess: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload
        },

        userSigninFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        userSignOut: (state, action) => {
            state.userInfo = null;
        },

        userRegisterRequest: (state, action) => {
            state.loading = true
        },

        userRegisterSuccess: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload
        },

        userRegisterFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        errorClear: (state, action) => {
            state.error = null
        }
    }
});

export const {
    userSigninRequest,
    userSigninSuccess,
    userSigninFail,
    userSignOut,
    userRegisterRequest,
    userRegisterSuccess,
    userRegisterFail,
    errorClear
} = slice.actions;
export default slice.reducer;

const url = "/api/users/";

export const signUser = (email, password) => apiCallBegan({
    url: url + "login",
    method: "post",
    data: {email, password},
    onStart: userSigninRequest.type,
    onSign: userSigninSuccess.type,
    onError: userSigninFail.type
});

export const outUser = () => (dispatch, getState) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: userSignOut.type });
};

export const clearError = () => (dispatch, getState) => {
    dispatch({ type: errorClear.type })
};

export const registerUser = (name, email, password) => apiCallBegan({
    url: url + "register",
    method: "post",
    data: {
        name,
        email,
        password
    },
    onStart: userRegisterRequest.type,
    onRegister: userRegisterSuccess.type,
    onError: userRegisterFail.type
});