import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function UserRoute({ component: Component, ...rest }) {
    const userSignin = useSelector((state) => state.entities.signinOrRegister);
    const { userInfo } = userSignin;
    const adminSignin = useSelector((state) => state.entities.adminPanel);
    const { adminInfo } = adminSignin;
    return (
        <Route
            {...rest}
            render={(props) => 
                userInfo || adminInfo ? (
                    <Component {...props}></Component>
                ) : (
                    <Redirect to="/signin" />
                )
            }
        ></Route>
    )
}
