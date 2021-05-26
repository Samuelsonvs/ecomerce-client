import React from 'react';
import ReactDOM from 'react-dom';
import './css/tailwind.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configStore from './redux/config/configureStore';
import { Provider } from 'react-redux';
import { verifyUser } from './redux/reduxSlice/userSigninOrRegisterSlice';
import { AdminAxios, UserAxios } from './utils/interceptors';
import { verifyAdmin } from './redux/reduxSlice/adminSlice';

const store = configStore();

store.dispatch(verifyUser());

store.dispatch(verifyAdmin());

UserAxios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "userInfo"
    )}`;
    return config;
  },
  (error) => Promise.reject(error)
);

AdminAxios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "adminInfo"
    )}`;
    return config;
  },
  (error) => Promise.reject(error)
);


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
