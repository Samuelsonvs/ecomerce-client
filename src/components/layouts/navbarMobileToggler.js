import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiLogIn, FiColumns, FiMapPin, FiSmile } from "react-icons/fi";

export default function NavbarMobileToggler() {
    const [menu, setMenu] = useState(false);
    const container = useRef(null);
  
    const menuFunc = () => {
      setMenu(!menu)
    };
  
    // Allow for outside click
    useEffect(() => {
      function handleOutsideClick(event) {
        if (!container.current.contains(event.target)) {
          if (!menu) return;
          setMenu(false);
        }
      }
    
  
      window.addEventListener("click", handleOutsideClick);
      return () => window.removeEventListener("click", handleOutsideClick);
    }, [menu, container]);
  
    // Allow to use the `esc` key
    useEffect(() => {
      function handleEscape(event) {
        if (!menu) return;
  
        if (event.key === "Escape") {
          setMenu(false);
        }
      }
  
      document.addEventListener("keyup", handleEscape);
      return () => document.removeEventListener("keyup", handleEscape);
    }, [menu]);
    return (
        <>
            <button className="lg:hidden mr-5 outline-none border-none" onClick={menuFunc}>
            {
              menu === false ? <FiMenu className="text-7xl text-white absolute top-5 right-5 z-20"/> :
              <FiX className="text-7xl text-white absolute top-5 right-5 z-40"/>
            }
            </button>
            {/* mobile */}
            <nav ref={container} className={(menu===true ? "transition duration-500 md:opacity-100" : "transition opacity-0 duration-500")+" mt-96 z-30 bg-indigo-700 text-white font-semibold sm:text-3xl absolute w-full"}>
                <ul>
                <li className="mt-3 mb-3 ml-3 w-full  hover:bg-indigo-500">
                    <FiLogIn className="inline mr-2" />
                    <Link className="border-b">
                    Giriş
                    </Link >
                </li>
                <li className="mt-5 mb-3 ml-3 w-full hover:bg-indigo-500">
                    <FiHome className="inline mr-2" />
                    <Link to="/">
                    Anasayfa
                    </Link>
                </li>
                <li className="mt-5 mb-3 ml-3 w-ful hover:bg-indigo-500">
                    <FiColumns className="inline mr-2" />
                    <Link to="/ilanlar">
                    Türler
                    </Link>
                </li>
                <li className="mt-5 mb-3 ml-3 w-full hover:bg-indigo-500">
                    <FiMapPin className="inline mr-2" />
                    <Link >
                    İletişim
                    </Link>
                </li>
                <li className="mt-5 mb-3 ml-3 w-full hover:bg-indigo-500">
                    <FiSmile className="inline mr-2" />
                    <Link >
                    Hakkımızda
                    </Link>
                </li>
                </ul>
            </nav>
        </>
    )
}
