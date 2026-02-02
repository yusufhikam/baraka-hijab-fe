import 'swiper/swiper-bundle.css';
import { EffectCards, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductType } from '../../../../types/productType';
import { baseImageUrl } from '../../../../utililties/api/urlBase';
import { useState } from 'react';
import { PhotosType } from '../../../../types/productPhoto';
import Button from '../../../elements/Button/Button';
import { X } from 'lucide-react';


type CaraouselProductPhotoProps = {
    data: ProductType | null
    variant?: string
}

const CarouselProductPhotos = ({ data, variant }: CaraouselProductPhotoProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedPhoto, setSelectedPhoto] = useState<PhotosType | null>(null);
    const [zoom, setZoom] = useState<boolean>(false);

    const pagination = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
            return '<span class="swiper-pagination-bullet-detail-product ' + className + '">' + (index + 1) + '</span>';
        }
    }

    const handleOpenModal = (id: number) => {
        const photo = data?.photos.find((photo) => photo.id === id);

        if (photo) {
            setSelectedPhoto(photo);
            setOpenModal(true);
        }
    }


    return (
        <>
            <div className={`${variant} swiper-product-detail`}>
                <Swiper
                    modules={[Navigation, Pagination, EffectCards]}
                    pagination={pagination}
                    navigation={true}
                    grabCursor={true}
                    effect={'cards'}
                    className='p-5 '
                >
                    {data?.photos.map((photo) => (
                        <SwiperSlide key={photo.id}>
                            <img src={`${baseImageUrl}/${photo.photo}`} className='w-full h-72 sm:h-96 block object-cover object-center' alt={`${data.name}`} onClick={() => handleOpenModal(photo.id)} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {openModal && selectedPhoto && (
                <div className="fixed z-2 top-0 backdrop-blur-sm bg-black/70 flex items-center justify-center left-0 w-full h-full p-3" >

                    {/* <div className="relative overflow-hidden"> */}
                        <img src={`${baseImageUrl}/${selectedPhoto.photo}`} alt={`${selectedPhoto.photo}`} className={`w-full object-cover transition-all duration-300 ${zoom ? 'scale-[3] cursor-zoom-out  ' : 'cursor-zoom-in'}`} onClick={() => setZoom(!zoom)} />
                    {/* </div> */}
                    <Button type='button' variant={`absolute bottom-7 right-1/2 translate-x-1/2 text-red-500 hover:bg-red-500 bg-white hover:text-white p-3 rounded-full  transition-all duration-300`} onClick={() => setOpenModal(false)}><X size={30} /></Button>
                </div>
            )}
        </>
    )
}


export default CarouselProductPhotos;