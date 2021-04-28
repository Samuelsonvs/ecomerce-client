import React, { useEffect, useRef, useState } from 'react';
import { FiHome, FiColumns, FiMapPin, FiSmile } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiSettings } from "react-icons/fi";
import { outUser } from '../../redux/reduxSlice/userSigninOrRegisterSlice';
import { SwalWarning } from '../../helpers/sweetalert2';

export default function Navbar() {
    const [userDropdown, setUserDropdown] = useState(false);
    const [adminDropdown, setAdminDropdown] = useState(false);
    const userContainer = useRef(null);
    const adminContainer = useRef(null);
    
    const userSignin = useSelector((state) => state.entities.signinOrRegister);
    const { userInfo } = userSignin;

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
                    console.log();
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
                    console.log();
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
                            <button type="button" onClick={handleUserDropdown} class="bg-gray-800 flex text-base rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-expanded="false" aria-haspopup="true">
                            <span class="sr-only">Open user menu</span>
                            <img class="h-14 w-14 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                            </button>
                        </div>
                        {/* sm:ml-96 sm:pl-60 */}

                        <div onClick={handleUserDropdown} ref={userContainer} class={"origin-top-right z-50 absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-200 "+(userDropdown ? "transform opacity-100 scale-100" : "transform opacity-0 scale-0")} role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                            <Link href="#" class="block px-4 py-2 border-gray-300 border-b text-lg text-gray-900 hover:bg-gray-100" role="menuitem">Your Profile</Link>
                            <Link to="/create" class="block px-4 py-2 border-gray-300 border-b text-lg text-gray-900 hover:bg-gray-100" role="menuitem">Create Advert</Link>
                            <Link href="#" class="block px-4 py-2 border-gray-300 border-b text-lg text-gray-900 hover:bg-gray-100" role="menuitem">Settings</Link>
                            <Link to="/" onClick={signOut} class="block px-4 py-2 text-lg text-gray-900 hover:bg-gray-100" role="menuitem">Sign out</Link>
                        </div>
                    </div>
                )   : (
                    <Link to="/signin" className="text-white p-2 md:inline-block hover:bg-gray-600 rounded-lg">
                        Login
                    </Link>
                )}
                {userInfo && userInfo.isAdmin && (
                    <div class="ml-7 relative inline-block">
                        <div>
                            <button type="button" onClick={handleAdminDropdown} class="bg-gray-800 flex text-base rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-expanded="false" aria-haspopup="true">
                            <FiSettings class=" h-14 w-14 rounded-full bg-gray-700 text-white" />
                            </button>
                        </div>

                        <div onClick={handleAdminDropdown} ref={adminContainer} class={"origin-top-right z-50 absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-200 "+(adminDropdown ? "transform opacity-100 scale-100" : "transform opacity-0 scale-0")} role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                            <Link to="/dashboard/productlist" class="block px-4 py-2 border-gray-300 border-b text-lg text-gray-900 hover:bg-gray-100" role="menuitem">Products</Link>
                            <Link to="/dashboard/orderlist" class="block px-4 py-2 border-gray-300 border-b text-lg text-gray-900 hover:bg-gray-100" role="menuitem">Orders</Link>
                            <Link to="/dashboard/customerlist" class="block px-4 py-2 border-gray-300 border-b text-lg text-gray-900 hover:bg-gray-100" role="menuitem">Customers</Link>
                        </div>
                    </div>
            )}
            </div>
        </>
    )
}

