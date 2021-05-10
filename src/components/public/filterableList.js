import React from 'react';
import { Link } from 'react-router-dom';
import ListItemInfoCard from './listItemInfoCard';



export default function FilterableList({HypeAllProductList, itemPerPage, pageNumber}) {
    return (
        <section className="w-full bg-white md:ml-10">
            <div className="bg-white md:p-5">
                <h3 className="text-center text-5xl font-bold text-indigo-700 border-b border-white border-solid pb-10">Filterable List</h3>
                <div className="flex justify-center">
                    <ul className="max-w-screen-xl md:flex-wrap md:flex md:justify-center md:ml-5">
                        {HypeAllProductList.slice((pageNumber-1) * itemPerPage, pageNumber* itemPerPage)
                            .map((state, index) => {
                            return (
                                <ListItemInfoCard 
                                key={index} 
                                image={state.image[0]} 
                                name={state.name} 
                                id={state._id} 
                                age={state.age} 
                                city={state.city} 
                                category={state.category} 
                                description={state.description} 
                            />
                            )
                        })}
                    </ul>
                </div>
            </div>
        </section>
    )
}
