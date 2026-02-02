import ArrowButtonWhite from "../../../../assets/svg/arrowButton.svg";
import ArrowButtonOrange from "../../../../assets/svg/arrowButton2.svg";

import { useState } from "react";
const Hero = () => {
    const [isHover, setIsHover] = useState<boolean>(false);

    return (
        <div className="relative h-[90vh] bg-[url('/src/assets/images/bg/bg-hero.jpg')]  bg-cover bg-no-repeat bg-center text-white">
            <div className="flex flex-col justify-center">
                <h1 className="text-center text-shadow font-krona-one-regular text-3xl sm:text-4xl md:text-6xl font-semibold mt-10 text-balance">
                    Feel Confident and Beautiful in Every Outfit
                </h1>
                <p className="text-center mt-5 text-wrap font-krub-regular text-sm sm:text-base text-shadow w-4/5 md:w-2/5 m-auto">
                    Our collection of Muslimah clothing is thoughtfully designed to help you express your unique style while staying true to your values
                </p>
            </div>

            <div className="flex justify-between ">
                <p className="absolute bottom-24 text-center p-3 m-3 backdrop-blur-[2px] bg-black/20 rounded sm:backdrop-blur-none sm:bg-transparent sm:rounded-none sm:p-0 sm:m-0 sm:text-left sm:w-1/2  sm:bottom-5 sm:left-5 font-krub-light text-shadow text-pretty ">
                    Since 2018, we've been bring your modest fasshion that blends comfort and style
                </p>

                <a href="#main-content" className="absolute bottom-5 right-1/2 translate-x-1/2 sm:bottom-5 sm:right-5 sm:translate-x-0">
                    <img src={isHover ? ArrowButtonOrange : ArrowButtonWhite} alt="icon" className="w-15 sm:w-10 transition-all duration-300" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} />
                </a>
            </div>
        </div>
    )
}

export default Hero;