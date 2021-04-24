import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { apiCallBegan } from '../api/api';


const slice = createSlice({
    name: "Lists",
    initialState: {
        latestList: [],
        topList: [],
        hypeList: [],
        generalList: [],
        loading: false,
        lastFetch: null,
        error: null,
    },
    reducers: {
        ListRequest: (state, action) => {
            state.loading = true
        },
        indexReceived: (state, action) => {
            state.loading = false;
            state.latestList = action.payload.prodLatest;
            state.topList = action.payload.prodTopList;
            state.lastFetch = Date.now();
        },
        hypeListReceived: (state, action) => {
            state.loading = false;
            state.hypeList = action.payload.hypeList;
        },
        generalListReceived: (state, action) => {
            state.loading = false;
            state.generalList = action.payload.generalList;
            state.hypeList = action.payload.hypeList
        },
        ListFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})


export const {
    ListRequest,
    indexReceived,
    hypeListReceived,
    generalListReceived,
    ListFail
} = slice.actions;
export default slice.reducer;

const url = "/api/product";

export const indexReceiver = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.lists;

    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')
    if ( diffInMinutes < 10 ) return;

    dispatch(apiCallBegan({
        url,
        onStart: ListRequest.type,
        onSuccess: indexReceived.type,
        onError: ListFail.type,
    }));
};


export const hypeListReceiver = () => apiCallBegan({
    url,
    onStart: ListRequest.type,
    onSuccess: hypeListReceived.type,
    onError: ListFail.type
});

export const generalListReceiver = () => apiCallBegan({
    url: url + '/allproduct',
    onStart: ListRequest.type,
    onSuccess: generalListReceived.type,
    onFail: ListFail.type
});