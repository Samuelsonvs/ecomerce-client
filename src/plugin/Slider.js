import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "../css/slider.css";


const fadeImages = [
    {
        img: "images/1.jpg"
    },
    {
        img: "images/2.jpg"
    },
    {
        img: "images/3.jpg"
    },
    {
        img: "images/4.jpg"
    },
];

export default function Slider() {
    return (
        <div className="carousel-container">
            <div className="top text-white absolute p-5 top-1/2 left-1/2 z-20">
                <h1 className="text-8xl">
                    HomePage Intro
                </h1>
            </div>
            <Carousel showStatus={false} transitionTime={1000} infiniteLoop showArrows autoPlay showThumbs={false}>
                {fadeImages.map((image,index) => {
                    return (
                        <div key={index}>
                            <img src={image.img} alt="ff" />
                        </div>
                        )
                })}
            </Carousel>
        </div>
    )
}

