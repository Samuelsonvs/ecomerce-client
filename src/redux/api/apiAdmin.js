import { AdminAxios } from '../../utils/interceptors';
import * as actions from './apiActions';

const apiAdminActions = ({ dispatch, getState }) => next => async action => {
    if (action.type !== actions.adminApi.type) { return next(action)};

    const { url, method, data, onVerifyAdmin, onStart, onSuccess, onError } = action.payload;

    if(onStart) dispatch({ type: onStart });

    if (url) {
        const localstor = JSON.parse(localStorage.getItem('adminInfo'));
        try{
            if (localstor) {
                next(action);
                try{
                    const response = await AdminAxios.request({
                        baseURL: process.env.APP_API_URL,
                        url,
                        method,
                        data,
                    });
                  
    
                    if(onVerifyAdmin && response.status === 200) {
                        dispatch({ type: onVerifyAdmin, payload: response.data });
                    };

                    if(onVerifyAdmin && response.status !== 200) {
                        localStorage.removeItem('adminInfo')
                    };

                    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });

                } catch(error) {
                    if(error){
                        localStorage.removeItem('adminInfo')
                    };
                    if (onError) {dispatch({ type: onError, payload: error.response.data.errors ? error.response.data.errors : error.message  })};
                }
            }
        }catch(error) {
            localStorage.removeItem('adminInfo')
        }
    }
}

export default apiAdminActions;