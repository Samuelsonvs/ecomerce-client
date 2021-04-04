import React, { useEffect, useRef, useState } from 'react';
import { FiHome, FiColumns, FiMapPin, FiSmile } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { outUser } from '../../redux/reduxSlice/userSigninOrRegisterSlice';

export default function Navbar() {
    const [dropdown, setDropdown] = useState(false);
    const container = useRef(null);
    
    const userSignin = useSelector((state) => state.entities.signinOrRegister);
    const { userInfo } = userSignin;

    const dropdownFunc = () => {
        setDropdown(!dropdown)
    };

    useEffect(() => {
        if (container.current !== null) {
            function handleOutsideClick(event) {
                try {
                    if (!container.current.contains(event.target)) {
                        if (!dropdown) return;
                        setDropdown(false);
                    }
                } catch (error) {
                    console.log();
                }
            }
            window.addEventListener("click", handleOutsideClick);
            return () => window.removeEventListener("click", handleOutsideClick);
        }
    }, [dropdown, container]);


    useEffect(() => {
        function handleEscape(event) {
          if (!dropdown) return;
    
          if (event.key === "Escape") {
            setDropdown(false);
          }
        }
        document.addEventListener("keyup", handleEscape);
        return () => document.removeEventListener("keyup", handleEscape);
      }, [dropdown]);
    
    const dispatch = useDispatch();
    const signOut = () => {
        setDropdown(false);
        dispatch(outUser());
    };

    return (
        <>
            <div>
                <nav className="hidden md:inline text-2xl lg:text-3xl text-white 2xl:text-4xl">
                    <ul className="flex">
                        <li className="mr-5 p-2 hover:bg-gray-600 rounded-lg">
                            <FiHome className="inline mb-2 mr-5" />
                            <Link to="/">Anasayfa</Link>
                        </li>
                        <li className="mr-5 p-2 hover:bg-gray-600 rounded-lg">
                            <FiColumns className="inline mb-2 ml-10 mr-5" />
                            <Link to="/ilanlar">Türler</Link>
                        </li>
                        <li className="mr-5 p-2 hover:bg-gray-600 rounded-lg">
                            <FiMapPin className="inline mb-2 ml-10 mr-5" />
                            <Link to="/">İletişim</Link>
                        </li>
                        <li className="p-2 hover:bg-gray-600 rounded-lg">
                            <FiSmile className="inline mb-2 ml-10 mr-5" />
                            <Link to="/">Hakkımızda</Link>
                        </li>
                    </ul>
                </nav>
            </div>                                      
            <div className="md:mr-10 absolute right-24 md:right-0 md:relative text-2xl">
                { userInfo ? (
                    <div class="ml-3 relative md:inline-block">
                        <div>
                            <button type="button" onClick={dropdownFunc} class="bg-gray-800 flex text-base rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-expanded="false" aria-haspopup="true">
                            <span class="sr-only">Open user menu</span>
                            <img class="h-14 w-14 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                            </button>
                        </div>
                        {/* sm:ml-96 sm:pl-60 */}

                        <div onClick={dropdownFunc} ref={container} class={"origin-top-right z-50 absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-200 "+(dropdown ? "transform opacity-100 scale-100" : "transform opacity-0 scale-0")} role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                            <a href="#" class="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</a>
                            <a href="#" class="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>
                            <Link to="/" onClick={signOut} class="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</Link>
                        </div>
                    </div>
                )   : (
                    <Link to="/signin" className="text-white p-2 md:inline-block hover:bg-gray-600 rounded-lg">
                        Login
                    </Link>
                )
                }
            </div>
        </>
    )
}

