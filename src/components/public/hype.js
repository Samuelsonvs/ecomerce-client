import React from 'react'

const listed = [1,2,3,4];

export default function Hype() {
    return (
        <div className="w-full md:p-10 border mb-10 md:mb-0">
            <div className="bg-white md:p-5">
                <h3 className="text-center text-5xl font-bold text-indigo-700 border-b border-white border-solid pb-10">Hype</h3>
                <div className="flex justify-center">
                    <ul className="max-w-screen-xl md:flex-wrap md:flex md:justify-evenly md:ml-5">
                        {listed.map((trying,index) => {
                            return (
                                <li key={index} className="md:mr-5">                    
                                    <div class="mt-10 bg-indigo-700 mx-auto rounded-xl overflow-hidden shadow-md md:max-w-2xl">
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
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}
