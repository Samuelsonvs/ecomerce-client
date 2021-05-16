import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../helpers/404.svg';
import { AiOutlineHome } from 'react-icons/ai';

export default function NotFoundScreen() {
    return (
        <div>
            <img src={Icon} alt="404-not-page-icon"></img>    
            <div className="w-full">
                <Link to="/">
                    <AiOutlineHome className="sm:w-20 sm:h-20  w-12 h-12 mx-auto text-indigo-600"/>
                </Link>
            </div>
        </div>
    )
}
