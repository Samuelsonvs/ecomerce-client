import React, { useEffect } from 'react';
import Slider from '../plugin/Slider';
import TopList from '../components/public/topList';
import Latest from '../components/public/latest';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/public/loadingBox';
import MessageBox from '../components/public/messageBox';
import { indexReceiver } from '../redux/reduxSlice/listsSlice';
import InfoCard from '../components/public/infoCard';
// import "react-responsive-carousel/lib/styles/carousel.css";

export default function HomePage() {
    const dispatch = useDispatch();

    const indexLists = useSelector((state) => state.entities.lists);

    const {
        loading,
        error,
        topList,
        latestList,
    } = indexLists;
   
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
            <div className="max-w-screen-xl mx-auto">
                <div>
                    <div className="flex-wrap flex">
                        <InfoCard 
                            variety={'Cockatiel'}
                            image={'/images/infocard/cockatiel.jpg'} 
                            head={'Care & Feeding'} 
                            info={
                                'A cockatiel needs a cage spacious enough to accommodate multiple perches, toys, food bowls and have plenty of room to flap its wings without hitting them against anything.'
                            }
                        />
                        <InfoCard
                            variety={'African Grey'}
                            image={'/images/infocard/africangrey.jpg'}
                            head={'Personality & Behavior'}
                            info={'Most bird keepers believe that only an experienced bird enthusiast should keep a grey.'}
                        />
                        <InfoCard
                            variety={'Finch'}
                            image={'/images/infocard/zebrafinch.jpg'}
                            head={'Speech & Sound'}
                            info={'Finches are not capable of emitting the ear-splitting screeches of parrots and therefore might make a good choice for those with close neighbors.'}
                        />
                        <InfoCard
                            variety={'Amazon'}
                            image={'/images/infocard/amazonparrot.jpg'}
                            head={'Health & Common Conditions'}
                            info={'Amazon parrots are prone to becoming obese, which is why owners should pay attention to the amount and types of food offered daily.'}
                        />
                    </div>
                    <div className="manual-toplist h-auto">
                        <h1 className="text-center mt-32 text-7xl text-indigo-900 pb-20 border-b-2 border-indigo-300">Top
                            <span className="font-black"> List</span>
                        </h1>
                        <ul className="list-none text-1xl flex justify-evenly flex-wrap">
                            {topList.map((state) => (
                                <TopList key={state._id} state={state} />
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h1 className="text-center mt-32 text-7xl text-indigo-900 pb-20 border-b-2 border-indigo-300">Latest
                            <span className="font-black"> List</span>
                        </h1>
                        <ul className="list-none text-1xl flex justify-evenly flex-wrap">
                            {latestList.map((state) => (
                                <Latest key={state._id} state={state} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}
