import React from 'react';
import { FiHome, FiColumns, FiMapPin, FiSmile } from "react-icons/fi";
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div>
            <nav className="hidden lg:inline text-2xl lg:text-4xl text-white 2xl:text-5xl">
                <ul className="flex">
                    <li className="mr-5">
                        <FiHome className="inline mb-2 mr-5" />
                        <Link to="/">Anasayfa</Link>
                    </li>
                    <li className="mr-5">
                        <FiColumns className="inline mb-2 ml-10 mr-5" />
                        <Link to="/ilanlar">Türler</Link>
                    </li>
                    <li className="mr-5">
                        <FiMapPin className="inline mb-2 ml-10 mr-5" />
                        <Link to="/">İletişim</Link>
                    </li>
                    <li>
                        <FiSmile className="inline mb-2 ml-10 mr-5" />
                        <Link to="/">Hakkımızda</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

