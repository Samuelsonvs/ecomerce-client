import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../api/api';


const slice = createSlice({
    name: "allProduct",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {
        allProductRequest: (state, action) => {
            state.loading = true
        },
        allProductReceived: (state, action) => {
            state.loading = false;
            state.list = action.payload.productAll;
        },
        allProductFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})


export const {
    allProductRequest,
    allProductReceived,
    allProductFail,
} = slice.actions;
export default slice.reducer;

const url = "/api/product/allproduct";

export const productAll = () => apiCallBegan({
    url,
    onStart: allProductRequest.type,
    onSuccess: allProductReceived.type,
    onFail: allProductFail.type
});