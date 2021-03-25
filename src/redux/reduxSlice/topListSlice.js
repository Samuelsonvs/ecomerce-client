import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { apiCallBegan } from '../api/api';


const slice = createSlice({
    name: "topList",
    initialState: {
        list: [],
        loading: false,
        lastFetch: null,
        error: null,
    },
    reducers: {
        topListReq: (state, action) => {
            state.loading = true
        },
        topListReceived: (state, action) => {
            state.loading = false;
            state.list = action.payload.prodTopList;
            state.lastFetch = Date.now();
        },
        topListFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})


export const {
    topListReq,
    topListReceived,
    topListFail,
} = slice.actions;
export default slice.reducer;

const url = "/api/product"

export const topListReceiver = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.topList;

    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')
    if ( diffInMinutes < 10 ) return;

    dispatch(apiCallBegan({
        url,
        onStart: topListReq.type,
        onSuccess: topListReceived.type,
        onError: topListFail.type
    }));
}