import { combineReducers } from 'redux';
import listsReducer from './reduxSlice/listsSlice';
import productDetailReducer from './reduxSlice/productDetailSlice';
import userSigninOrRegisterReducer from './reduxSlice/userSigninOrRegisterSlice';
import adminReducer from './reduxSlice/adminSlice';

export default combineReducers({
    lists: listsReducer,
    productDetail: productDetailReducer,
    signinOrRegister: userSigninOrRegisterReducer,
    adminPanel: adminReducer,
});