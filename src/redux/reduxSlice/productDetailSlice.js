import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan, withLoginApiCallBegan } from '../api/api';

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
        productUpdate: (state, action) => {
            state.loading = false;
            state.product = action.payload.product
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
    productUpdate,
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


export const updateProduct = (product) => withLoginApiCallBegan({
    url: url + '/' + product._id,
    method: 'put',
    data: product,
    onStart: productDetailRequested.type,
    onSuccess: productUpdate.type,
    onFail: prodcutDetailFail.type
})