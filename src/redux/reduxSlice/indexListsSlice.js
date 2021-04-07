import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { apiCallBegan } from '../api/api';


const slice = createSlice({
    name: "indexLists",
    initialState: {
        lastEnteredList: [],
        topList: [],
        loading: false,
        lastFetch: null,
        error: null,
    },
    reducers: {
        indexRequest: (state, action) => {
            state.loading = true
        },
        indexReceived: (state, action) => {
            state.loading = false;
            state.lastEnteredList = action.payload.prodLastEntered;
            state.topList = action.payload.prodTopList;
            state.lastFetch = Date.now();
        },
        indexFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})


export const {
    indexRequest,
    indexReceived,
    indexFail
} = slice.actions;
export default slice.reducer;

const url = "/api/product";

export const indexReceiver = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.indexLists;

    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')
    if ( diffInMinutes < 10 ) return;

    dispatch(apiCallBegan({
        url,
        onStart: indexRequest.type,
        onSuccess: indexReceived.type,
        onError: indexFail.type,
    }));
}