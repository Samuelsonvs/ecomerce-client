import React from 'react';
import { Link } from 'react-router-dom';



export default function TopList({ state }) {
    return (
        <li key={state._id} className="w-80 min-h-96 ml-7 mr-7 mt-20 rounded-2xl p-5">
            <div className="">
                <Link to={`/ilan/${state._id}`} className="cursor-pointer container flex justify-center mt-5 transform hover:scale-110 transition duration-700 ease-in-out motion-reduce:transform-none"> 
                    <img className="rounded-full object-cover h-60 w-60 shadow-xl" src={state.image[0]} alt={"card-icon"} />
                </Link>
                <p className="leading-10 mb-10 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Animi autem quae quasi culpa dicta dolorem exercitationem quis? 
                    Nisi, rerum?
                </p>
            </div>
            <Link to={`/ilan/${state._id}`} className="block py-3 px-4 bg-indigo-600 text-white text-center cursor-pointer font-semibold rounded-lg shadow-md hover:bg-indigo-900">
                {state.category}
            </Link>
        </li>
    )
}
