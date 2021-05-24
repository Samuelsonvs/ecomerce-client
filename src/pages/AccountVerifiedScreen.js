import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { confirmRegister } from '../redux/reduxSlice/userSigninOrRegisterSlice';

export default function AccountVerifiedScreen(props) {
    const id = props.location.pathname.split("user/")[1]

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(confirmRegister(id))
    }, [dispatch]);

    return (
        <div>
            Thank you for verified.Go to <Link to="/signin">signin</Link>
        </div>
    )
}

