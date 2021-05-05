import { createSlice } from '@reduxjs/toolkit';
import { adminApi, publicApi } from '../api/apiActions';

const slice = createSlice({
    name: 'admin',
    initialState: {
        adminInfo: null,
        loading: false,
        error: null
    },

    reducers: {
        adminRequest: (state, action) => {
            state.loading = true
        },
        adminSigninSuccess: (state, action) => {
            state.loading = false;
            state.adminInfo = action.payload
        },
        adminSigninFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        adminSignOut: (state, action) => {
            state.adminInfo = null;
        },
        adminVerify: (state, action) => {
            state.loading = false;
            state.adminInfo = action.payload
        },
    }
});

export const {
   adminRequest,
   adminSigninSuccess,
   adminSigninFail,
   adminSignOut,
   adminVerify
} = slice.actions;
export default slice.reducer;

const url = "/api/admin/";

export const signAdmin = (email, password) => publicApi({
    url: url + "login",
    method: "post",
    data: {email, password},
    onStart: adminRequest.type,
    onAdmin: adminSigninSuccess.type,
    onError: adminSigninFail.type
});

export const outUser = () => (dispatch, getState) => {
    localStorage.removeItem('adminInfo');
    dispatch({ type: adminSignOut.type });
};

export const verifyAdmin = () => adminApi({
    url: url + 'verify',
    onVerifyAdmin: adminVerify.type
})