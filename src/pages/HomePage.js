import React, { useEffect } from 'react';
import Slider from '../plugin/Slider';
import TopList from '../components/public/topList';
import LastEntered from '../components/public/lastEntered';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/public/loadingBox';
import MessageBox from '../components/public/messageBox';
import { FaArrowCircleRight } from 'react-icons/fa';
import { indexReceiver } from '../redux/reduxSlice/indexListsSlice';
// import "react-responsive-carousel/lib/styles/carousel.css";


export default function HomePage() {
    const dispatch = useDispatch();

    const indexLists = useSelector((state) => state.entities.indexLists);

    const {
        loading,
        error,
        topList,
        lastEnteredList
    } = indexLists;

    topList.map((state) => console.log((new Date(state.createdAt).toLocaleDateString())));
   


    useEffect(() => {
        dispatch(indexReceiver());
    }, [dispatch]);

    return (
        <div>
            <Slider />
            {loading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox variant={"error"} >Hata Mesajı</MessageBox>
            ) : (
            <div className="flex justify-center">
                <div className="max-w-screen-2xl">
                    <div className="flex-wrap flex">
                        <div class="mt-10 bg-indigo-700 mx-auto rounded-xl overflow-hidden shadow-md max-w-2xl">
                            <div class="flex max-h-64">
                                <div class="flex-shrink-0">
                                    <img class="h-64 object-cover w-56" src="/images/try.jpg" alt="Man looking at item at a store" />
                                </div>
                                <div class="p-8">
                                    <div class="flex justify-between uppercase tracking-wide text-sm text-indigo-200 font-semibold">Sultan Papağanı
                                        <Link><FaArrowCircleRight className="ml-2 text-white inline text-3xl" /></Link>
                                    </div>
                                    <a href="#" class="block mt-1 text-lg sm:text-2xl leading-tight font-medium text-yellow-300 font-semibold hover:underline">Sultan Papağanı Ne Yer?</a>
                                    <p class="mt-1 text-white text-lg sm:text-xl">Sultan papağanı, sağlığını koruyabilmek için; karbonhidrat, protein, yağ, vitamin ve mineral gruplarının hepsine ihtiyaç duymaktadır.</p>
                                </div>
                            </div>
                        </div>
                        <div class=" mt-10 bg-indigo-700 mx-auto rounded-xl overflow-hidden shadow-md max-w-2xl">
                            <div class="flex max-h-64">
                                <div class="flex-shrink-0">
                                    <img class="h-64 object-cover w-56" src="/images/try.jpg" alt="Man looking at item at a store" />
                                </div>
                                <div class="p-8">
                                    <div class="flex justify-between uppercase tracking-wide text-sm text-indigo-200 font-semibold">Jako
                                        <Link><FaArrowCircleRight className="ml-2 text-white inline text-3xl" /></Link>
                                    </div>
                                    <a href="#" class="block mt-1 text-lg sm:text-2xl leading-tight font-medium text-yellow-300 font-semibold hover:underline">Sultan Papağanı Bakımı Nasıl Yapılır?</a>
                                    <p class="mt-1 text-white text-lg sm:text-xl">Sultan papağanlarının bakımı oldukça zahmetsiz ve kolaydır. Bu kapsamda papağan için dikkat edilecek bakımların başında tırnak ve gaga gelmektedir.</p>
                                </div>
                            </div>
                        </div>
                        <div class=" mt-10 bg-indigo-700 mx-auto rounded-xl overflow-hidden shadow-md max-w-2xl">
                            <div class="flex max-h-64">
                                <div class="flex-shrink-0">
                                    <img class="h-64 object-cover w-56" src="/images/try.jpg" alt="Man looking at item at a store" />
                                </div>
                                <div class="p-8">
                                    <div class="flex justify-between uppercase tracking-wide text-sm text-indigo-200 font-semibold">Monk
                                    <Link><FaArrowCircleRight className="ml-2 text-white inline text-3xl" /></Link>
                                    </div>
                                    <a href="#" class="block mt-1 text-lg sm:text-2xl leading-tight font-medium text-yellow-300 font-semibold hover:underline">Finding customers for your new business</a>
                                    <p class="mt-1 text-white text-lg sm:text-xl">Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="manual-toplist h-auto max-w-screen-xl">
                        <h1 className="text-center mt-32 text-7xl text-indigo-900 pb-20 border-b-2 border-indigo-300">Top
                            <span className="font-black"> List</span>
                        </h1>
                        <ul className="list-none text-1xl flex justify-evenly flex-wrap">
                            {topList.map((producTop) => (
                                <TopList key={producTop._id} producTop={producTop} />
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h1 className="text-center mt-32 text-7xl text-indigo-900 pb-20 border-b-2 border-indigo-300">Last
                            <span className="font-black"> Entered</span>
                        </h1>
                        <ul className="list-none text-1xl flex justify-evenly flex-wrap">
                            {lastEnteredList.map((productLast) => (
                                <LastEntered key={productLast._id} productLast={productLast} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}
