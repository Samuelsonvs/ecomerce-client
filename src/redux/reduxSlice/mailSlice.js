import { createSlice } from '@reduxjs/toolkit';
import { publicApi, withLoginApi } from '../api/apiActions';

const slice = createSlice({
    name: "Lists",
    initialState: {
        loading: false,
        mailInfo: null,
        error: null,
    },
    reducers: {
        mailRequest: (state, action) => {
            state.loading = true
        },
        mailSuccess: (state, action) => {
            state.loading = false;
            state.mailInfo = action.payload;
        },
        mailFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})


export const {
    mailRequest,
    mailSuccess,
    mailFail
} = slice.actions;
export default slice.reducer;

const url = '/mail/';

export const sendMail = (name, email, head, description) => withLoginApi({
    url: url + 'sendmail',
    method: 'post',
    data: {
        name,
        email,
        head,
        description
    }, 
    onStart: mailRequest.type,
    onSuccess: mailSuccess.type,
    onError: mailFail.type
})


export const saveMail = (email) => publicApi({
    url: url + 'savemail',
    method: 'post',
    data: {
        email
    },
    onStart: mailRequest.type,
    onSuccess: mailSuccess.type,
    onError: mailFail.type
})