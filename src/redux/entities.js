import { combineReducers } from 'redux';
import topListReducer from './reduxSlice/topListSlice';
import lastEnteredReducer from './reduxSlice/lastEnteredSlice';
import productDetailReducer from './reduxSlice/productDetailSlice';
import userSigninReducer from './reduxSlice/userSigninSlice';


export default combineReducers({
    topList: topListReducer,
    lastEntered: lastEnteredReducer,
    productDetail: productDetailReducer,
    userSignin: userSigninReducer,
});
