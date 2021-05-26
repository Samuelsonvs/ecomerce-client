import { createSlice } from '@reduxjs/toolkit';
import { adminApi, publicApi } from '../api/apiActions';

const slice = createSlice({
    name: 'admin',
    initialState: {
        adminInfo: null,
        loading: false,
        users: null,
        error: null,
    },

    reducers: {
        adminRequest: (state, action) => {
            state.loading = true
        },
        adminSigninSuccess: (state, action) => {
            state.loading = false;
            state.adminInfo = action.payload
        },
        adminFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        adminGetUser : (state, action) => {
            state.loading = false;
            state.users = action.payload.users;
        },
        adminSignOut: (state, action) => {
            state.adminInfo = null;
        },
        adminRemoveHandler: (state, action) => {
            state.loading = false;
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
   adminFail,
   adminGetUser,
   adminRemoveHandler,
   adminSignOut,
   adminVerify
} = slice.actions;
export default slice.reducer;

const url = "/admin/";

export const signAdmin = (email, password) => publicApi({
    url: url + "login",
    method: "post",
    data: {email, password},
    onStart: adminRequest.type,
    onAdmin: adminSigninSuccess.type,
    onError: adminFail.type
});

export const adminExit = () => (dispatch, getState) => {
    localStorage.removeItem('adminInfo');
    dispatch({ type: adminSignOut.type });
};

export const verifyAdmin = () => adminApi({
    url: url + 'verify',
    onVerifyAdmin: adminVerify.type
});

export const changeUserStatus = (userID) => adminApi({
    url: url + userID,
    onSuccess: adminGetUser.type,
});


export const getUsers = () => adminApi({
    url: url + 'getusers',
    onStart: adminRequest.type,
    onSuccess: adminGetUser.type,
    onError: adminFail.type
})

export const removeProducts = (choosensID, listName) => adminApi({
    url: url + 'remove',
    method:'delete',
    data: {choosensID, listName},
    onStart: adminRequest.type,
    onSucces: adminRemoveHandler.type,
    onError: adminFail.type
})