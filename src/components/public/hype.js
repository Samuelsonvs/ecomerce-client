import React from 'react'
import { Link } from 'react-router-dom';


export default function Hype({ list }) {
    const tryList = list.slice(0,4);
    return (
        <div className="w-full md:p-10 border mb-10 md:mb-0">
            <div className="bg-white md:p-5">
                <h3 className="text-center text-5xl font-bold text-indigo-700 border-b border-white border-solid pb-10">Hype</h3>
                <div className="flex justify-center">
                    <ul className="max-w-screen-xl md:flex-wrap md:flex md:justify-evenly md:ml-5">
                        {tryList.map((state,index) => {
                            return (
                                <li key={index} className="md:mr-5">                    
                                    <div class="mt-10 bg-indigo-700 mx-auto rounded-xl overflow-hidden shadow-md max-w-2xl">
                                        <div class="flex max-h-64">
                                            <div class="flex-shrink-0">
                                                <img class="h-64 w-56 object-cover" src={state.image} alt="Man looking at item at a store" />
                                            </div>
                                            <div class="p-4 md:p-8">
                                                <div class="uppercase tracking-wide text-sm text-indigo-200 font-semibold">{state.name}</div>
                                                <Link to={state._id} class="block mt-1 text-xl leading-tight text-yellow-200 font-semibold border-b pb-3 hover:text-yellow-400">Finding customers for your new business</Link>
                                                <p class="mt-2 text-base text-white">Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p>
                                                <div className="flex justify-between mt-3 sm:mt-7">
                                                    <span className="px-4 text-indigo-200 bg-indigo-500 rounded-md">0 - 5 Aylık</span>
                                                    <span className="px-4 text-indigo-200 bg-indigo-500 rounded-md">İstanbul</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}
