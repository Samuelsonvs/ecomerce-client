import { combineReducers } from 'redux';
import listsReducer from './reduxSlice/listsSlice';
import productDetailReducer from './reduxSlice/productDetailSlice';
import userSigninOrRegisterReducer from './reduxSlice/userSigninOrRegisterSlice';


export default combineReducers({
    lists: listsReducer,
    productDetail: productDetailReducer,
    signinOrRegister: userSigninOrRegisterReducer,
});



// indexListsSlice 
// indexLists  