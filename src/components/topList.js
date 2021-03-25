import React from 'react';
import { Link } from 'react-router-dom';



export default function TopList(props) {
    const { producTop } = props;
    return (
        <li key={producTop._id} className="w-80 min-h-96 ml-7 mr-7 mt-20 rounded-2xl p-5">
            <div className="">
                <Link className="cursor-pointer container flex justify-center mt-5 transform hover:scale-110 transition duration-700 ease-in-out motion-reduce:transform-none"> 
                    <img className="rounded-full h-60 w-60 shadow-xl" src={producTop.image} alt={producTop.description} />
                </Link>
                <p className="leading-10 mb-10 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Animi autem quae quasi culpa dicta dolorem exercitationem quis? 
                    Nisi, rerum?
                </p>
            </div>
            <h6 className="py-3 px-4 bg-indigo-600 text-white text-center cursor-pointer font-semibold rounded-lg shadow-md hover:bg-indigo-900">
                <Link>{producTop.category}</Link>
            </h6>
        </li>
    )
}
