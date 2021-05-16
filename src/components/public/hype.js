import React from 'react'
import ListItemInfoCard from './listItemInfoCard';


export default function Hype({ hypeList }) {
    return (
        <div className="w-full bg-white md:p-10 border mb-10 md:mb-0">
            <div className="mt-10 md:p-5">
                <h3 className="text-center text-5xl font-bold text-indigo-700 border-b border-white border-solid pb-10">Hype</h3>
                <div className="flex justify-center">
                    <ul className="max-w-screen-xl md:flex-wrap md:flex md:justify-evenly md:ml-5">
                        {hypeList.map((state,index) => {
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
        </div>
    )
}
