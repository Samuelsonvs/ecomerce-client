import React from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function InfoCard({variety, image, head, info}) {
    return (
        <div class="mt-10 bg-indigo-700 mx-auto rounded-xl overflow-hidden shadow-md max-w-2xl">
            <div class="flex max-h-64">
                <div class="flex-shrink-0">
                    <img class="h-64 object-cover w-56" src={image} alt="Man looking at item at a store" />
                </div>
                <div class="p-8">
                    <div class="flex justify-between uppercase tracking-wide text-sm text-indigo-200 font-semibold">{variety}
                        <Link><FaArrowCircleRight className="ml-2 text-white inline text-3xl" /></Link>
                    </div>
                    <a href="#" class="block mt-1 text-lg sm:text-2xl leading-tight font-medium text-yellow-300 font-semibold hover:underline">{head}</a>
                    <p class="mt-1 text-white text-lg sm:text-xl">{info}</p>
                </div>
            </div>
        </div>
    )
}
