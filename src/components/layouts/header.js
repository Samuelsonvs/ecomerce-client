import React from 'react';
import { AiFillDingtalkCircle } from "react-icons/ai";
import { FiHome, FiColumns, FiMapPin, FiSmile } from "react-icons/fi";
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className="flex">
            <div className="inline-block">
                <h1 className="text-white text-7xl font-bold w-64 inline">PtieL
                <span><AiFillDingtalkCircle className="inline-block"/></span></h1>  
            </div>
          
            <div className="ml-5 my-auto">
                <nav className="hidden md:inline text-2xl lg:text-3xl text-white 2xl:text-4xl">
                    <ul className="flex">
                        <li className="mr-2 p-2 hover:bg-gray-600 rounded-lg">
                            <Link to="/">
                            <FiHome className="inline mb-2 mr-2" />
                                Anasayfa</Link>
                        </li>
                        <li className="mr-2 p-2 hover:bg-gray-600 rounded-lg">
                            <Link to="/ilanlar">
                            <FiColumns className="inline mb-2 ml-5 mr-2" />
                                Türler</Link>
                        </li>
                        <li className="mr-2 p-2 hover:bg-gray-600 rounded-lg">
                            <Link to="/contact">
                            <FiMapPin className="inline mb-2 ml-5 mr-2" />
                                İletişim</Link>
                        </li>
                        <li className="p-2 hover:bg-gray-600 rounded-lg">
                            <Link to="/">
                            <FiSmile className="inline mb-2 ml-5 mr-2" />
                                Hakkımızda</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
             
    )
}
