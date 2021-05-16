import React from 'react';
import { Link } from 'react-router-dom';

export default function Latest({ state }) {
    return (
        <li key={state._id} className="w-80 min-h-96 ml-7 mr-7 mt-20 rounded-2xl p-5">
            <div className="">
                <div className="flex flex-wrap justify-between ">
                    <svg className="bg-indigo-500 rounded-xl" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><g><rect fill="none" height="24" width="24" x="0"/></g><g><g><g><path d="M20,4H4C2.89,4,2.01,4.89,2.01,6L2,18c0,1.11,0.89,2,2,2h16c1.11,0,2-0.89,2-2V6C22,4.89,21.11,4,20,4z M8.5,15H7.3 l-2.55-3.5V15H3.5V9h1.25l2.5,3.5V9H8.5V15z M13.5,10.26H11v1.12h2.5v1.26H11v1.11h2.5V15h-4V9h4V10.26z M20.5,14 c0,0.55-0.45,1-1,1h-4c-0.55,0-1-0.45-1-1V9h1.25v4.51h1.13V9.99h1.25v3.51h1.12V9h1.25V14z"/></g></g></g></svg>
                    <svg className="bg-indigo-500 rounded-xl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0z" fill="none"/><path d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-10 5h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                </div>
                <Link to={`/advert/${state._id}`} className="container flex justify-center mt-5 cursor-pointer"> 
                    <img className="h-64 w-full object-cover shadow-xl rounded-xl  transform hover:scale-110 transition duration-700 ease-in-out motion-reduce:transform-none" src={state.image[0]} alt={"card-icon"} />
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
