import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { adminApi, publicApi } from '../api/apiActions';


const slice = createSlice({
    name: "Lists",
    initialState: {
        latestList: [],
        topList: [],
        hypeList: [],
        allProductList: [],
        requestList: [],
        loading: false,
        lastFetch: null,
        advertslastFetch: null,
        error: null,
    },
    reducers: {
        listRequest: (state, action) => {
            state.loading = true
        },
        indexSuccess: (state, action) => {
            state.loading = false;
            state.latestList = action.payload.prodLatest;
            state.topList = action.payload.prodTopList;
            state.lastFetch = Date.now();
        },
        hypeListSuccess: (state, action) => {
            state.loading = false;
            state.hypeList = action.payload.hypeList;
        },
        hypeAllProductListSuccess: (state, action) => {
            state.loading = false;
            state.allProductList = action.payload.allProductList;
            state.hypeList = action.payload.hypeList
        },
        requestListSuccess: (state, action) => {
            state.loading = false;
            state.requestList = action.payload.requestList;
        },
        listFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})


export const {
    listRequest,
    indexSuccess,
    hypeListSuccess,
    hypeAllProductListSuccess,
    requestListSuccess,
    listFail
} = slice.actions;
export default slice.reducer;

const url = "/api/product";

export const indexReceiver = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.lists;

    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')
    if ( diffInMinutes < 10 ) return;

    dispatch(publicApi({
        url,
        onStart: listRequest.type,
        onSuccess: indexSuccess.type,
        onError: listFail.type,
    }));
};

export const hypeListReceiver = () => publicApi({
    url,
    onStart: listRequest.type,
    onSuccess: hypeListSuccess.type,
    onError: listFail.type
});

export const HypeAllProductListReceiver = () => publicApi({
    url: url + '/allproduct',
    onStart: listRequest.type,
    onSuccess: hypeAllProductListSuccess.type,
    onFail: listFail.type
});

export const topAndLatestListReceiver = () => publicApi({
    url,
    onStart: listRequest.type,
    onSuccess: indexSuccess.type,
    onError: listFail.type,
});

export const requestListReceiver = () => adminApi({
    url: '/api/admin/requestlist',
    onStart: listRequest.type,
    onSuccess: requestListSuccess.type,
    onFail: listFail.type
})