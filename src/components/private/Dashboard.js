import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CreateButton from '../public/createButton';
import InputLabel from '../public/inputLabel';
import LoadingBox from '../public/loadingBox';
import MessageBox from '../public/messageBox';
import { clearError } from '../../redux/reduxSlice/userSigninOrRegisterSlice';
import { signAdmin } from '../../redux/reduxSlice/adminSlice';

export default function SigninScreen(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';

    const adminSignin = useSelector((state) => state.entities.adminPanel);
    const { adminInfo, loading, error } = adminSignin;
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signAdmin(email, password));

    };

    useEffect(() => {
        if(adminInfo) {
            //dispatch(clearError());
            props.history.push(redirect);
        }
    }, [props.history, redirect, adminInfo, error, dispatch]);

    return (
        <div className="md:flex max-w-screen-2xl md:justify-center ml-2">
            <div className="mt-20 md:w-2/5 flex-shrink-0">
                <h2 className="text-center text-gray-700 text-4xl mb-10 font-extrabold">Sign In to your account</h2>
                <h5 className="w-full text-center h-2 border-b leading-3 mt-10 mb-20 bg-gray-200  rounded-md">
                </h5>
            <form className="form" onSubmit={submitHandler}>
                {loading && <LoadingBox></LoadingBox>}
                {error &&  <MessageBox variant="error">{'ERROR'}</MessageBox>}
                <InputLabel 
                    type='email'
                    tag='email'
                    name='Email Address'
                    callback={setEmail}
                    />
                <InputLabel 
                    type='password'
                    tag='password'
                    name='Password'
                    callback={setPassword}
                    />
                <div>
                <div className="mt-10">
                    <CreateButton name={'Sign in'} />
                </div>
                </div>
            </form>
            </div>
        </div>
    )
}