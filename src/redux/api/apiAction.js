import axios from 'axios';
import * as actions from './api';

const api = ({ dispatch, getState }) => next => async action => {
    if (action.type !== actions.apiCallBegan.type) { return next(action)};

    
    const { url, method, data, onStart, onSuccess, onError } = action.payload;
    if(onStart) dispatch({ type: onStart });  

    if (url) {
        next(action); 
        try{
            const response = await axios.request({
                url,
                method,
                data,
            });
            if (onSuccess) dispatch({ type: onSuccess, payload: response.data });

        } catch(error) {
            console.log(error);
            if (onError) {dispatch({ type: onError, payload: error.response.data.message ? error.response.data.message : error.message  })};
        }
    }
}

export default api;