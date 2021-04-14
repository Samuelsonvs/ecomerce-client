import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailProduct } from '../redux/reduxSlice/productDetailSlice';
import Lightbox from '../plugin/react-image-lightbox/index';
import '../plugin/react-image-lightbox/style.css';

const images = [
    "/images/mega/mega111.jpg",
    "/images/mega/mega222.jpg",
    "/images/mega/mega333.jpg",
    "/images/mega/mega444.jpg",
    "/images/mega/mega555.jpg",
]

const midImages = [
    "/images/mid/thumb111.jpg",
    "/images/mid/thumb222.jpg",
    "/images/mid/thumb333.jpg",
    "/images/mid/thumb444.jpg",
    "/images/mid/thumb555.jpg",
]

const thumbImages = [
    "/images/thumb/mini111.jpg",
    "/images/thumb/mini222.jpg",
    "/images/thumb/mini333.jpg",
    "/images/thumb/mini444.jpg",
    "/images/thumb/mini555.jpg",
]

export default function ProductDetailScreen(props) {
    const productId = props.match.params.id;
    const productDetails = useSelector(state => state.entities.productDetail);
    const { loading, error, product } = productDetails;

    const [currentImage, setCurrentImage] = useState("/images/mid/thumb111.jpg");
    const [lightbox, setLightbox] = useState(false);
    const [bigImage, setBigImages] = useState(images[midImages.indexOf(currentImage)]);
    const nextImage = images[((images.indexOf(bigImage) + 1) % images.length)];
    const prevImage = images[((images.indexOf(bigImage) + images.length - 1) % images.length)];

    const currentImageFunc = (e) => {
        e.preventDefault(); 
        setCurrentImage(midImages[thumbImages.indexOf(e.target.attributes.src['value'])])
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailProduct(productId));
    }, [dispatch, productId]);

    useEffect(() => {
        setBigImages(images[midImages.indexOf(currentImage)])
    }, [currentImage]);

    return (
        <div className="container sm:ml-5">
            <h1 className="text-4xl text-gray-800 p-5 border-b">Ele alışkın sultan papağanları</h1>
            <div className="md:flex md:justify-evenly">
                <div className="mt-10 flex justify-center items-center md:items-start flex-col">
                    <div className="mt-5">
                        {/* <button onClick={() => setLightbox(true)}>asasas</button> */}
                        <button className="focus:outline-none cursor-zoom-in" onClick={() => setLightbox(true)}>
                        {lightbox &&
                                    
                            <Lightbox 
                                mainSrc={bigImage}
                                nextSrc={nextImage}
                                prevSrc={prevImage}
                                onCloseRequest={() => setLightbox(false)}
                                onMoveNextRequest={() => setBigImages(nextImage)}
                                onMovePrevRequest = {() => setBigImages(prevImage)}
                            />
    

                        } 
                            <img className="inline" src={currentImage}/>
                        
                        </button>
                    </div>
                    <div className="mt-5">
                        {thumbImages.map((state, index) => {
                            return (
                                <button key={index} className="focus:outline-none cursor-pointer" onClick={currentImageFunc}>
                                    <img className="max-w-xs max-h-32 inline" alt="midi" src={state}/>
                                </button>
                            )
                        })}
                    </div>
                </div>
                <div className="ml-10 mt-10">
                    <ul>
                        <li className="py-5 flex border-b flex-col items-center">
                            <div>
                                <Link class="bg-gray-800 flex text-base rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-expanded="false" aria-haspopup="true">
                                    <span class="sr-only">Open user menu</span>
                                    <img class="h-20 w-20 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                                </Link>
                            </div>
                            <span className="mt-4">İstanbul</span>
                        </li>
                        <li className="py-5 flex border-b">
                            <span className="font-semibold w-1/2 sm:w-48">İlan sahibi</span>
                            <Link className="text-blue-800 underline">
                                <span>Franz Kafka</span>
                            </Link>
                        </li>
                        <li className="py-5 flex border-b">
                            <span className="font-semibold w-1/2 sm:w-48">Tel</span>
                            <span className="text-gray-700">555 55 55</span>
                        </li>
                        <li className="py-5 flex border-b">
                            <span className="font-semibold w-1/2 sm:w-48">İlan tarihi</span>
                            <span className="text-gray-700">05.05.2023</span>
                        </li>
                        <li className="py-5 flex border-b">
                            <span className="font-semibold w-1/2 sm:w-48">Cins</span>
                            <span className="text-gray-700">Sultan Papağanı</span>
                        </li>
                        <li className="py-5 flex border-b">
                            <span className="font-semibold w-1/2 sm:w-48">Cinsiyet</span>
                            <span className="text-gray-700">Erkek</span>
                        </li>
                        <li className="py-5 flex border-b">
                            <span className="font-semibold w-1/2 sm:w-48">Yaş</span>
                            <span className="text-gray-700">0-6 Aylık</span>
                        </li>
                        <li className="py-5 flex border-b">
                            <span className="font-semibold w-1/2 sm:w-48">Kimden</span>
                            <span className="text-gray-700">Üreticiden</span>
                        </li>
                    </ul>
                </div>       
            </div>
            <div className="mt-10">
                <h3 className="border-b py-5 font-bold text-3xl">Açıklama</h3>
                <div className="mt-4 max-w-6xl">
                    <p>
                    Contrary to popular belief, Lorem Ipsum is not simply random text. 
                    It has roots in a piece of classical Latin literature from 45 BC, 
                    making it over 2000 years old. Richard McClintock, a Latin professor 
                    at Hampden-Sydney College in Virginia, looked up one of the more 
                    obscure Latin words, consectetur, from a Lorem Ipsum passage, and 
                    going through the cites of the word in classical literature, 
                    discovered the undoubtable source. 
                    </p>
                </div>
            </div>
        </div>
    )
}
