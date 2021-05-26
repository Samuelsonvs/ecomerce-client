import { createSlice } from '@reduxjs/toolkit';
import { adminApi, publicApi, withLoginApi } from '../api/apiActions';

const slice = createSlice({
    name: 'productDetail',
    initialState: {
        product: [],
        loading: true,
        error: null
    },
    reducers: {
        productRequest: (state, action) => {
            state.loading = true;
        },
        productDetailSuccess: (state, action) => {
            state.loading = false;
            state.product = action.payload;
        },
        productUpdate: (state, action) => {
            state.loading = false;
            state.product = action.payload.product
        },
        productCreate: (state, action) => {
            state.loading = false;
            state.product = action.payload.product
        },
        prodcutFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})


export const {
    productRequest,
    productDetailSuccess,
    productUpdate,
    productCreate,
    prodcutFail
} = slice.actions;
export default slice.reducer;

const url = '/product';

export const detailProduct = (productId) => publicApi({
    url: url + '/' + productId,
    method: 'get',
    onStart: productRequest.type,
    onSuccess: productDetailSuccess.type,
    onError: prodcutFail.type
});


export const updateProduct = (product) => adminApi({
    url: url + '/update/' + product._id,
    method: 'put',
    data: product,
    onStart: productRequest.type,
    onSuccess: productUpdate.type,
    onFail: prodcutFail.type
})


export const createProduct = (product) => adminApi({
    url: url + "/" + product.path,
    method: 'post',
    data: product,
    onStart: productRequest.type,
    onSuccess: productCreate.type,
    onFail: prodcutFail.type
})


export const requestProduct = (product) => withLoginApi({
    url: url + "/" + product.path,
    method: 'post',
    data: product,
    onStart: productRequest.type,
    onSuccess: productCreate.type,
    onFail: prodcutFail.type
})