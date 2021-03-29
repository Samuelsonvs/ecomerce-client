import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../api/api';

const slice = createSlice({
    name: 'userSignin',
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
        }
    }
});

export const {
    userSigninRequest,
    userSigninSuccess,
    userSigninFail,
    userSignOut
} = slice.actions;
export default slice.reducer;

const url = "/api/users/login";

export const signUser = (email, password) => apiCallBegan({
    url,
    method: "post",
    data: {email, password},
    onStart: userSigninRequest.type,
    onSign: userSigninSuccess.type,
    onError: userSigninFail.type
});

export const outUser = () => apiCallBegan({
    onOut: userSignOut.type
})