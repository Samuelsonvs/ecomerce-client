import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {FiHome, FiColumns, FiMapPin, FiSmile } from "react-icons/fi";
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
            <div id="menuToggle" className="block md:hidden">

              <input id="burger-input" type="checkbox" checked={menu} onClick={menuFunc}/>
              <span></span>
              <span></span>
              <span></span>
            </div>
            
            {/* mobile */}
            <nav id="mobile-nav" onClick={menuFunc} ref={container} className={'top-0 right-0 h-screen absolute z-30 bg-gray-700 text-white font-semibold sm:text-3xl md:hidden  transition duration-500 ease-in-out '
             + (menu === false ? 'transform translate-x-full scale-0 opacity-0' : 'transform translate-x-0 w-1/2')}> 
                <ul>
                <li className="mt-80 mb-3 text-center ">
                    <Link className="block w-full py-4 hover:bg-gray-400" to="/">
                    <FiHome className="inline mr-2" />
                    HomePage
                    </Link>
                </li>
                <li className="mt-5 mb-3 text-center">
                    <Link className="block w-full py-4 hover:bg-gray-400" to="/ilanlar">
                    <FiColumns className="inline mr-2" />
                    Species
                    </Link>
                </li>
                <li className="mt-5 mb-3 text-center">
                    <Link className="block w-full py-4 hover:bg-gray-400" to='/contact' >
                    <FiMapPin className="inline mr-2" />
                    Contact
                    </Link>
                </li>
                <li className="mt-5 mb-3 text-center">
                    <Link className="block w-full py-4 hover:bg-gray-400" >
                    <FiSmile className="inline mr-2" />
                    About Us
                    </Link>
                </li>
                </ul>
            </nav>
        </>
    )
}
