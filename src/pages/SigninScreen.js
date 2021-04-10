import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/public/loadingBox';
import MessageBox from '../components/public/messageBox';
import { clearError, signUser } from '../redux/reduxSlice/userSigninOrRegisterSlice';

export default function SigninScreen(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';

    const userSignin = useSelector((state) => state.entities.signinOrRegister);
    const { userInfo, loading, error } = userSignin;
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signUser(email, password));

    };

    useEffect(() => {
        if(userInfo) {
            dispatch(clearError());
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo, error, dispatch]);

    return (
        <div className="md:flex max-w-screen-2xl md:justify-center ml-2">
            <div className="mt-20 md:w-2/5 flex-shrink-0">
                <h2 className="text-center text-gray-700 text-4xl font-extrabold">Sign In to your account</h2>
                <p className="mt-2 text-center text-2xl text-gray-600">Or
                        <Link className="font-medium text-indigo-600 hover:text-indigo-500"> Register</Link>
                </p>
                <label className="opacity-70 font-semibold">Sign in with</label>
                <div>
                    <ul className="flex flex-wrap mt-5 justify-evenly">
                        <li className="pl-10 pr-10 pb-2 pt-2 border-solid border-2 rounded-lg">
                            <Link>
                                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.125 9.66666H16.4938C15.8437 9.66666 15.7084 9.93371 15.7084 10.6068V12.0833H18.125L17.8724 14.5H15.7084V22.9583H12.0834V14.5H9.66663V12.0833H12.0834V9.29449C12.0834 7.15695 13.2083 6.04166 15.7434 6.04166H18.125V9.66666ZM14.5 0C6.49238 0 0 6.49238 0 14.5C0 22.5076 6.49238 29 14.5 29C22.5076 29 29 22.5076 29 14.5C29 6.49238 22.5076 0 14.5 0Z" fill="rgba(108, 114, 128, 1)"></path></svg>
                            </Link>
                        </li>
                        <li className="ml-5 pl-10 pr-10 pb-2 pt-2 border-solid border-2 rounded-lg">
                            <Link>
                                <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22.3297 11.6544C22.5508 16.5361 18.9102 21.9796 12.465 21.9796C10.505 21.9796 8.68166 21.4044 7.14587 20.4196C8.98737 20.6371 10.8252 20.126 12.2837 18.9817C10.766 18.9539 9.48278 17.951 9.04053 16.5723C9.58549 16.6762 10.1207 16.6448 10.6089 16.5131C8.94018 16.176 7.78749 14.674 7.82495 13.0657C8.29378 13.3255 8.82784 13.4814 9.39697 13.4995C7.85151 12.4664 7.41408 10.4255 8.32275 8.86554C10.0338 10.9656 12.5918 12.348 15.4761 12.4918C14.9698 10.3216 16.6167 8.23117 18.8582 8.23117C19.855 8.23117 20.7577 8.65166 21.3909 9.32712C22.1811 9.17124 22.9242 8.88247 23.5948 8.48492C23.3351 9.29572 22.7853 9.9748 22.0687 10.405C22.7708 10.3204 23.4402 10.1343 24.0625 9.85757C23.5973 10.5536 23.0088 11.165 22.3297 11.6544ZM15 0C6.99238 0 0.5 6.49238 0.5 14.5C0.5 22.5076 6.99238 29 15 29C23.0076 29 29.5 22.5076 29.5 14.5C29.5 6.49238 23.0076 0 15 0Z" fill="rgba(108, 114, 128, 1)"></path></svg>
                            </Link>
                        </li>
                        <li className="ml-5 pl-10 pr-10 pb-2 pt-2 border-solid border-2 rounded-lg">
                            <Link>
                                <svg height="30" viewBox="0 0 72 72" width="29" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M36,72 L36,72 C55.882251,72 72,55.882251 72,36 L72,36 C72,16.117749 55.882251,-3.65231026e-15 36,0 L36,0 C16.117749,3.65231026e-15 -2.4348735e-15,16.117749 0,36 L0,36 C2.4348735e-15,55.882251 16.117749,72 36,72 Z" fill="rgba(108, 114, 128, 1)"/><path d="M18,26.1623226 L18,46.5476129 C18,47.6566452 18.8117419,48.5554839 19.9300645,48.5554839 L51.7447742,48.5554839 C52.8619355,48.5554839 53.6748387,47.6461935 53.6748387,46.5476129 L53.6748387,26.1623226 C53.6748387,24.9452903 52.947871,24 51.7447742,24 L19.9300645,24 C18.6805161,24 18,24.9685161 18,26.1623226 M20.9334194,27.9379355 C20.9334194,27.4467097 21.2307097,27.1656774 21.7056774,27.1656774 C21.9994839,27.1656774 33.560129,34.4910968 34.2603871,34.9207742 L36.0696774,36.0460645 C36.6433548,35.6616774 37.2193548,35.3330323 37.8139355,34.9347097 C39.0274839,34.1589677 49.8251613,27.1656774 50.1224516,27.1656774 C50.5985806,27.1656774 50.8947097,27.4467097 50.8947097,27.9379355 C50.8947097,28.4581935 49.8925161,28.9749677 49.239871,29.3732903 C45.1393548,31.8723871 41.04,34.5967742 36.980129,37.1887742 C36.7432258,37.3490323 36.2845161,37.6916129 35.9407742,37.6393548 C35.5575484,37.580129 23.7936774,30.0224516 21.6534194,28.7636129 C21.3317419,28.5743226 20.9334194,28.4012903 20.9334194,27.9379355" fill="#fff"/></g></svg>
                            </Link>
                        </li>
                    </ul>
                </div>
                <h5 className="w-full text-center h-2 border-b leading-3 mt-10 mb-20 bg-gray-200  rounded-md">
                    <span className="bg-indigo-50 pt-0 pr-10 pl-10 pb-0 text-gray-700 opacity-100">
                        Or Continue with
                    </span>
                </h5>
            <form className="form" onSubmit={submitHandler}>
                {loading && <LoadingBox></LoadingBox>}
                {error &&  <MessageBox variant="error">{error}</MessageBox>}
                <div className="mt-10 mb-10">
                    <label className="text-gray-600 font-semibold" htmlFor="email">Email address</label>
                    <input
                        className="mt-2 block w-full h-16 border border-transparent rounded-md"
                        type="email"
                        id="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        ></input>
                </div>
                <div>
                    <label className="text-gray-600 font-semibold" htmlFor="password">Password</label>
                    <input
                        className="mt-2 block w-full h-16 border border-transparent rounded-md"
                        type="password"
                        id="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        ></input>
                </div>
                <div>
                <div className="mt-10">
                    <label />                                         
                    <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        Sign in
                    </button>
                </div>
                </div>

                <div className="mt-10">
                    <label />
                    <div>
                        New customer?{' '} 
                        <Link className="font-medium text-indigo-600 hover:text-indigo-500"to={`/register?redirect=${redirect}`}>
                            Create your account</Link>
                    </div>
                </div>
            </form>
            </div>
        </div>
    )
}