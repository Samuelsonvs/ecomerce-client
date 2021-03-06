import React from 'react'
import { Link } from 'react-router-dom'

export default function ListItemInfoCard({ image, name, id, age, city, category, description}) {
    return (
        <li className="md:mr-5">                    
            <div className="mt-10 bg-indigo-700 mx-auto rounded-xl overflow-hidden shadow-md max-w-2xl">
                <div className="flex max-h-64">
                    <div className="flex-shrink-0">
                        <img className="h-64 w-56 object-cover" src={image} alt="Man looking at item at a store" />
                    </div>
                    <div className="p-4 md:p-8">
                        <div className="uppercase tracking-wide text-sm text-indigo-200 font-semibold">{category}</div>
                        <Link to={`/advert/${id}`} className="block mt-1 text-xl leading-tight text-yellow-200 font-semibold border-b pb-3 hover:text-yellow-400">{name}</Link>
                        <p className="mt-2 text-base text-white">Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p>
                        <div className="h-1/3 flex justify-between items-end">
                            <span className="px-4 text-indigo-100 bg-green-500 rounded-md">{age}</span>
                            <span className="px-4 text-indigo-100 bg-yellow-600 rounded-md">{city}</span>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}
