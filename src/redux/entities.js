import { combineReducers } from 'redux';
import topListReducer from './reduxSlice/topListSlice';
import lastEnteredReducer from './reduxSlice/lastEnteredSlice';


export default combineReducers({
    topList: topListReducer,
    lastEntered: lastEnteredReducer,
});
