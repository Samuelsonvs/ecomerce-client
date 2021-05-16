import React from 'react';
import { AiFillDingtalkCircle } from "react-icons/ai";
import { FiHome, FiBookOpen, FiMapPin, FiAlertOctagon } from "react-icons/fi";
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className="flex">
            <div className="inline-block">
                <h1 className="text-white text-7xl font-bold w-64 inline">PtieL
                <span><AiFillDingtalkCircle className="inline-block"/></span></h1>  
            </div>
          
            <div className="ml-5 my-auto">
                <nav className="hidden md:inline text-2xl  text-white ">
                    <ul className="flex">
                        <li className="mr-2 p-2 hover:bg-blue-400 rounded-lg">
                            <Link to="/">
                            <FiHome className="inline mb-2 mr-2" />
                                HomePage</Link>
                        </li>
                        <li className="mr-2 p-2 hover:bg-blue-400 rounded-lg">
                            <Link to="/adverts">
                            <FiAlertOctagon className="inline mb-2 ml-5 mr-2" />
                                Adverts</Link>
                        </li>
                        <li className="mr-2 p-2 hover:bg-blue-400 rounded-lg">
                            <Link to="/">
                            <FiBookOpen className="inline mb-2 ml-5 mr-2" />
                                Species</Link>
                        </li>
                        <li className="mr-2 p-2 hover:bg-blue-400 rounded-lg">
                            <Link to="/contact">
                            <FiMapPin className="inline mb-2 ml-5 mr-2" />
                                Contact</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
             
    )
}
