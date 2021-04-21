import React from 'react';



export default function FilterableList({generalList, itemPerPage, pageNumber}) {
    return (
        <section className="w-full bg-white md:ml-10">
            <div className="mt-10">
                <h3 className="text-center text-5xl font-bold text-indigo-700">Filterable List</h3>
                <div>
                    <ul className="md:flex-wrap md:flex md:justify-center md:ml-5">
                        {generalList.slice((pageNumber-1) * itemPerPage, pageNumber* itemPerPage)
                            .map((state, index) => {
                            return (
                                <li key={index} className="md:mr-5">                    
                                    <div class="mt-10 bg-indigo-700  mx-auto rounded-xl overflow-hidden shadow-md max-w-2xl">
                                        <div class="flex max-h-64">
                                            <div class="flex-shrink-0">
                                                <img class="h-64 w-56 object-cover" src={state.image[0]} alt="Man looking at item at a store" />
                                            </div>
                                            <div class="p-4 md:p-8">
                                                <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Case study</div>
                                                <a href="#" class="block mt-1 text-lg leading-tight font-medium text-yellow-200 font-semibold text-xl border-b pb-3 hover:text-yellow-400">Finding customers for your new business</a>
                                                <p class="mt-2 text-white">{state._id + '    '}Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </section>
    )
}
