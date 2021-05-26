import axios from 'axios';
import * as actions from './apiActions';

const baseURL = process.env.REACT_APP_API_URL;

const apiPublic = ({ dispatch, getState }) => next => async action => {
    if (action.type !== actions.publicApi.type) { return next(action)};

    
    const { url, method, data, onStart, onSuccess, onAdmin, onSign, onError } = action.payload;
    if(onStart) dispatch({ type: onStart });  

    
    if (url) {
        next(action); 
        try{
            const response = await axios.request({
                baseURL,
                url,
                method,
                data,
            });

            if (onSign) {
                dispatch({ 
                    type: onSign, 
                    payload: {
                        _id: response.data._id,
                        email:response.data.email,
                        name: response.data.name,
                        token: (response.data.token).join(''),
                    }
                })
                localStorage.setItem('userInfo', JSON.stringify((response.data.token.join(''))));
            };

            if (onAdmin) {
                dispatch({ type: onAdmin, payload: {token: (response.data.token).join('')} })
                localStorage.setItem('adminInfo', JSON.stringify((response.data.token.join(''))))
            }

            if (onSuccess) dispatch({ type: onSuccess, payload: response.data });

            if (onError) {dispatch({ type: onError, payload: ''})}

        } catch(error) {
            if(error.response.status === 401){
                localStorage.removeItem('userInfo')
            };
            if (onError) {dispatch({ type: onError, payload: error.response.data.errors ? error.response.data.errors : error.message  })};
        }
    }
}

export default apiPublic;