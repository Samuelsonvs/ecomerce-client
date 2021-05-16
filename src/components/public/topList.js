import React from 'react';
import { Link } from 'react-router-dom';



export default function TopList({ state }) {
    return (
        <li key={state._id} className="w-80 min-h-96 ml-7 mr-7 mt-20 rounded-2xl p-5">
            <div>
                <Link to={`/advert/${state._id}`} className="cursor-pointer container flex justify-center mt-5 transform hover:scale-110 transition duration-700 ease-in-out motion-reduce:transform-none"> 
                    <img className="h-64 w-full object-cover shadow-xl rounded-xl" src={state.image[0]} alt={"card-icon"} />
                </Link>
                <div className="mb-10 mt-5 bg-indigo-600 rounded-lg h-60">
                    <p className="leading-8 p-2 text-white text-lg">Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                        Animi autem quae quasi culpa dicta dolorem exercitationem quis? 
                        Nisi, rerum?
                    </p>
                </div>
                <div className="flex justify-around text-white mb-5">
                    <span className="px-3 bg-green-500 rounded-lg">
                        {state.age}
                    </span>
                    <span className="px-3 bg-yellow-600 rounded-lg">
                        {state.city}
                    </span>
                </div>
            </div>
            <Link to={`/advert/${state._id}`} className="block py-3 px-4 bg-indigo-600 text-white text-center cursor-pointer font-semibold rounded-lg shadow-md hover:bg-indigo-900">
                {state.category}
            </Link>
        </li>
    )
}
