import { combineReducers } from 'redux';
import topListReducer from './reduxSlice/topListSlice';
import lastEnteredReducer from './reduxSlice/lastEnteredSlice';
import productDetailReducer from './reduxSlice/productDetailSlice';
import userSigninOrRegisterReducer from './reduxSlice/userSigninOrRegisterSlice';
import allProduct from './reduxSlice/allProductSlice';


export default combineReducers({
    topList: topListReducer,
    lastEntered: lastEnteredReducer,
    productDetail: productDetailReducer,
    signinOrRegister: userSigninOrRegisterReducer,
    receivedProduct: allProduct,
});