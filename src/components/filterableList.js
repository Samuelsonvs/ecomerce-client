import React from 'react'

export default function FilterableList() {
    return (
        <section className="w-full border border-gray-500 rounded-2xl border-solid bg-indigo-700 md:ml-10">
            <div className="mt-10">
                <h3 className="text-center text-5xl font-bold text-white">Filterable List</h3>
                <div>
                    <ul className="md:flex-wrap md:flex ml-5">
                        <li className="mr-5">                    
                            <div class="mt-10  mx-auto rounded-xl overflow-hidden shadow-md md:max-w-2xl">
                                <div class="flex max-h-64 w-full">
                                    <div class="md:flex-shrink-0">
                                        <img class="manual-hype-img h-64 w-56 object-cover" src="/images/try.jpg" alt="Man looking at item at a store" />
                                    </div>
                                    <div class="p-4 md:p-8">
                                        <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Case study</div>
                                        <a href="#" class="block mt-1 text-lg leading-tight font-medium text-yellow-200 font-semibold text-xl border-b pb-3 hover:text-yellow-400">Finding customers for your new business</a>
                                        <p class="mt-2 text-white">Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}
