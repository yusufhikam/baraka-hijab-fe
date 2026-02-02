import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { useQuery } from '@tanstack/react-query';
import getSubCategoriesCarousel from '../../../../utililties/api/categories/getSubCategoriesCarousel';
import { baseImageUrl } from '../../../../utililties/api/urlBase';
import Button from '../../../elements/Button/Button';
import CustomPagination from './CustomPagination';




const CarouselHomeProduct = () => {



    const { data, isLoading, isError } = useQuery({
        queryKey: ['subcategory', 'carousel'],
        queryFn: getSubCategoriesCarousel,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5
    });


    return (
        <div className="relative w-full">

            {isError ? (
                <p className='text-red-500'>Something went wrong</p>
            ) : (
                isLoading ? (
                    <div className='w-full h-60 animate-pulse bg-gray-300'></div>
                ) : data && (
                    <>

                        <Swiper modules={[Navigation, EffectFade, Pagination]}
                            navigation={{
                                nextEl: '.button-next',
                                prevEl: '.button-prev',
                            }}
                            effect='fade'
                            pagination={false}
                            loop={true}
                            grabCursor={true}
                            
                        >

                            {/* BUTTON NEXT & PREVIOUS */}
                            <Button type='button' variant='z-2  absolute button-prev bottom-1/2 translate-y-1/2 left-10  w-20 h-20 hover:scale-110 transition-all duration-300'>
                                <img src="/src/assets/svg/arrowButton.svg" className='w-10 rotate-90' alt="" />
                            </Button>

                            <Button type='button' variant='z-2 absolute button-next bottom-1/2 translate-y-1/2 right-0 w-20 h-20 hover:scale-110 transition-all duration-300' >
                                <img src="/src/assets/svg/arrowButton.svg" className='w-10 -rotate-90' alt="" />
                            </Button>

                            {data.map((item) => {
                                return (
                                    <SwiperSlide key={item.id} >
                                        <div className="absolute text-xs sm:text-base z-2 flex flex-row gap-5 left-1/2 -translate-x-1/2 top-5 backdrop-blur-sm bg-black/20 py-2 px-5 rounded-xl shadow">
                                            <CustomPagination data={data} item={item} />
                                        </div>
                                        <div style={{ backgroundImage: `url(${baseImageUrl}/${item.products?.[0]?.thumbnail})` }} className='bg-center bg-no-repeat bg-cover h-[90vh]'></div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </>
                )
            )}

        </div>
    )
}

export default CarouselHomeProduct;