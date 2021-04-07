import { combineReducers } from 'redux';
import indexListsReducer from './reduxSlice/indexListsSlice';
import productDetailReducer from './reduxSlice/productDetailSlice';
import userSigninOrRegisterReducer from './reduxSlice/userSigninOrRegisterSlice';
import allProduct from './reduxSlice/allProductSlice';


export default combineReducers({
    indexLists: indexListsReducer,
    productDetail: productDetailReducer,
    signinOrRegister: userSigninOrRegisterReducer,
    receivedProduct: allProduct,
});