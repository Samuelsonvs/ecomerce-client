import axios from 'axios';
import * as actions from './api';

const apiWithLogin = ({ dispatch, getState }) => next => async action => {
    if (action.type !== actions.withLoginApiCallBegan.type) { return next(action)};

    
    const { url, method, data, onStart, onSuccess, onSign, onRegister, onError } = action.payload;
    
    if(onStart) dispatch({ type: onStart });

    if (url) {
        next(action); 
        try{
            const {
                entities: { signinOrRegister: userInfo }
            } = getState();
            const response = await axios.request({
                url,
                method,
                data,
                headers: {
                    Authorization: `Bearer ${userInfo.userInfo.token}`,
                }
            });

            if (onSign || onRegister) {
                onSign  ? dispatch({ type: onSign, payload: response.data })
                        : dispatch({ type: onRegister, payload: response.data });
                localStorage.setItem('userInfo', JSON.stringify(response.data));
            };

            if (onSuccess) dispatch({ type: onSuccess, payload: response.data });

        } catch(error) {
            if(error.response.status === 401){
                localStorage.removeItem('userInfo')
            };
            if (onError) {dispatch({ type: onError, payload: error.response.data.errors ? error.response.data.errors : error.message  })};
        }
    }
}

export default apiWithLogin;