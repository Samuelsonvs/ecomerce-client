import { UserAxios } from '../../utils/interceptors';
import * as actions from './apiActions';

const apiLoginVerify = ({ dispatch, getState }) => next => async action => {
    if (action.type !== actions.withLoginApi.type) { return next(action)};

    const { url, method, data, onVerifyUser, onStart, onSuccess, onError } = action.payload;

    if(onStart) dispatch({ type: onStart });

    if (url) {
        const localstor = JSON.parse(localStorage.getItem('userInfo'));
        try{
            if (localstor) {
                next(action);
                try{
                    const response = await UserAxios.request({
                        url,
                        method,
                        data,
                    });
                  
    
                    if(onVerifyUser && response.status === 200) {
                        dispatch({ type: onVerifyUser, payload: response.data });
                    };

                    if(onVerifyUser && response.status !== 200) {
                        localStorage.removeItem('userInfo')
                    };

                    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });

                } catch(error) {
                    if(error){
                        localStorage.removeItem('userInfo')
                    };
                    if (onError) {dispatch({ type: onError, payload: error.response.data.errors ? error.response.data.errors : error.message  })};
                }
            }
        }catch(error) {
            localStorage.removeItem('userInfo')
        }
    }
}

export default apiLoginVerify;