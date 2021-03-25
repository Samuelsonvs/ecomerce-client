import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { apiCallBegan } from '../api/api';


const slice = createSlice({
    name: "lastEntered",
    initialState: {
        list: [],
        loading: false,
        lastFetch: null,
        error: null,
    },
    reducers: {
        lastEnteredReq: (state, action) => {
            state.loading = true
        },
        lastEnteredReceived: (state, action) => {
            state.loading = false;
            state.list = action.payload.prodLastEntered;
            state.lastFetch = Date.now();
        },
        lastEnteredFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})


export const {
    lastEnteredReq,
    lastEnteredReceived,
    lastEnteredFail,
} = slice.actions;
export default slice.reducer;

const url = "/api/product";

export const lastEnteredReceiver = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.lastEntered;

    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')
    if ( diffInMinutes < 10 ) return;

    dispatch(apiCallBegan({
        url,
        onStart: lastEnteredReq.type,
        onSuccess: lastEnteredReceived.type,
        onError: lastEnteredFail.type,
    }));
}