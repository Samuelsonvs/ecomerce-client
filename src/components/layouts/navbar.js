import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiSettings } from "react-icons/fi";
import { outUser } from '../../redux/reduxSlice/userSigninOrRegisterSlice';
import { SwalWarning } from '../../helpers/sweetalert2';
import { adminExit } from '../../redux/reduxSlice/adminSlice';

export default function Navbar() {
    const [userDropdown, setUserDropdown] = useState(false);
    const [adminDropdown, setAdminDropdown] = useState(false);
    const userContainer = useRef(null);
    const adminContainer = useRef(null);
    
    const userSignin = useSelector((state) => state.entities.signinOrRegister);
    const { userInfo } = userSignin;

    const adminSignin = useSelector((state) => state.entities.adminPanel);
    const { adminInfo } = adminSignin;

    const handleUserDropdown = () => {
        setUserDropdown(!userDropdown)
    };

    const handleAdminDropdown = () => {
        setAdminDropdown(!adminDropdown)
    };


    // outside click handler
    useEffect(() => {
        if (userContainer.current !== null) {
            function handleOutsideClick(event) {
                try {
                    if (!userContainer.current.contains(event.target)) {
                        if (!userDropdown) return;
                        setUserDropdown(false);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            window.addEventListener("click", handleOutsideClick);
            return () => window.removeEventListener("click", handleOutsideClick);
        }
    }, [userDropdown, userContainer]);

    // outside click handler
    useEffect(() => {
        if (adminContainer.current !== null) {
            function handleOutsideClick(event) {
                try {
                    if (!adminContainer.current.contains(event.target)) {
                        if (!adminDropdown) return;
                        setAdminDropdown(false);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            window.addEventListener("click", handleOutsideClick);
            return () => window.removeEventListener("click", handleOutsideClick);
        }
    }, [adminDropdown, adminContainer]);


    // esc click handler
    useEffect(() => {
        function handleEscape(event) {
          if (!userDropdown && !adminDropdown) return;
    
          if (event.key === "Escape") {
            setUserDropdown(false);
            setAdminDropdown(false);
          }
        }
        document.addEventListener("keyup", handleEscape);
        return () => document.removeEventListener("keyup", handleEscape);
    }, [userDropdown, adminDropdown]);

    
      
    const dispatch = useDispatch();

    const exitAdmin = () => {
        dispatch(adminExit())
    };
    
    const signOut = () => {
        setUserDropdown(false);
        SwalWarning('Warning!', 'Are you sure you want to logout?', () => dispatch(outUser()));
    };

    return (
        <>                          
            <div className="md:mr-10 absolute right-24 md:right-0 md:relative text-2xl">
                { userInfo ? (
                    <div class="ml-3 relative inline-block">
                        <div>
                            <button type="button" onClick={handleUserDropdown} class="hover:bg-indigo-600 flex text-base rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white" id="user-menu" aria-expanded="false" aria-haspopup="true">
                            <span class="sr-only">Open user menu</span>
                            <img class="h-14 w-14 rounded-full" src="images/profil2.png" alt=""/>
                            </button>
                        </div>
                        {/* sm:ml-96 sm:pl-60 */}

                        <div onClick={handleUserDropdown} ref={userContainer} class={"origin-top-right z-50 absolute right-0 mt-3 w-72 rounded-md shadow-xl py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-75 "+(userDropdown ? "transform opacity-100 scale-100" : "transform opacity-0 scale-0")} role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                            <Link href="#" class="block px-4 py-3 border-gray-300 border-b text-xl text-gray-900 hover:bg-gray-100" role="menuitem">Your Profile</Link>
                            <Link to="/create" class="block px-4 py-3 border-gray-300 border-b text-xl text-gray-900 hover:bg-gray-100" role="menuitem">Create Advert</Link>
                            <Link href="#" class="block px-4 py-3 border-gray-300 border-b text-xl text-gray-900 hover:bg-gray-100" role="menuitem">Settings</Link>
                            <Link to="/" onClick={signOut} class="block px-4 py-3 text-xl text-gray-900 hover:bg-gray-100" role="menuitem">Sign out</Link>
                        </div>
                    </div>
                )   : (
                    <Link to="/signin" className="text-white p-2 md:inline-block hover:bg-blue-400 rounded-lg">
                        Login
                    </Link>
                )}
                {adminInfo && (
                    <div class="ml-7 relative inline-block">
                        <div>
                            <button type="button" onClick={handleAdminDropdown} class="bg-indigo-600 flex text-base rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white" aria-expanded="false" aria-haspopup="true">
                            <FiSettings class=" h-14 w-14 rounded-full bg-indigo-600 text-white" />
                            </button>
                        </div>

                        <div onClick={handleAdminDropdown} ref={adminContainer} class={"origin-top-right z-50 absolute right-0 mt-3 w-72 rounded-md shadow-xl py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-75 "+(adminDropdown ? "transform opacity-100 scale-100" : "transform opacity-0 scale-0")} role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                            <Link to="/dashboard/productlist" class="block px-4 py-2 border-gray-300 border-b text-lg text-gray-900 hover:bg-gray-100" role="menuitem">Products</Link>
                            <Link to="/dashboard/customerlist" class="block px-4 py-2 border-gray-300 border-b text-lg text-gray-900 hover:bg-gray-100" role="menuitem">Customers</Link>
                            <Link to="/" onClick={exitAdmin} class="block px-4 py-2 text-lg text-gray-900 hover:bg-gray-100" role="menuitem">Exit</Link>
                        </div>
                    </div>
            )}
            </div>
        </>
    )
}

