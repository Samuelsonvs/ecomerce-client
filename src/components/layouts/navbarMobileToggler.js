import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {FiHome, FiLogIn, FiColumns, FiMapPin, FiSmile } from "react-icons/fi";
import '../../css/burger.css';

export default function NavbarMobileToggler() {
    const [menu, setMenu] = useState(false);
    const container = useRef(null);
  
    const menuFunc = (e) => {
      e.stopPropagation();
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
            {/* burger */}
            <div id="menuToggle" className="block lg:hidden">

              <input id="burger-input" type="checkbox" checked={menu} onClick={menuFunc}/>
              <span></span>
              <span></span>
              <span></span>
            </div>
            
            {/* mobile */}
            <nav id="mobile-nav" onClick={menuFunc} ref={container} className={'top-0 right-0 h-screen absolute overflow-hidden z-30 bg-indigo-700 text-white font-semibold sm:text-3xl lg:hidden  transition duration-500 ease-in-out '
             + (menu === false ? 'transform translate-x-full w-0' : 'transform translate-x-0 w-1/2')}> 
                <ul>
                <li className="mt-80 mb-3 ml-12 hover:bg-indigo-500">
                    <FiLogIn className="inline mr-2" />
                    <Link to="/signin" className="border-b">
                    Giriş
                    </Link >
                </li>
                <li className="mt-5 mb-3 ml-12 hover:bg-indigo-500">
                    <FiHome className="inline mr-2" />
                    <Link to="/">
                    Anasayfa
                    </Link>
                </li>
                <li className="mt-5 mb-3 ml-12 hover:bg-indigo-500">
                    <FiColumns className="inline mr-2" />
                    <Link to="/ilanlar">
                    Türler
                    </Link>
                </li>
                <li className="mt-5 mb-3 ml-12 hover:bg-indigo-500">
                    <FiMapPin className="inline mr-2" />
                    <Link >
                    İletişim
                    </Link>
                </li>
                <li className="mt-5 mb-3 ml-12 hover:bg-indigo-500">
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
