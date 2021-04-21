import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../api/api';

const slice = createSlice({
    name: 'productDetail',
    initialState: {
        product: [],
        loading: true,
        error: null
    },
    reducers: {
        productDetailRequested: (state, action) => {
            state.loading = true;
        },
        
        productDetailReceived: (state, action) => {
            state.loading = false;
            state.product = action.payload;
        },

        prodcutDetailFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})


export const {
    productDetailRequested,
    productDetailReceived,
    prodcutDetailFail
} = slice.actions;
export default slice.reducer;

const url = '/api/product';

export const detailProduct = (productId) => apiCallBegan({
    url: url + '/' + productId,
    method: 'get',
    onStart: productDetailRequested.type,
    onSuccess: productDetailReceived.type,
    onError: prodcutDetailFail.type
});