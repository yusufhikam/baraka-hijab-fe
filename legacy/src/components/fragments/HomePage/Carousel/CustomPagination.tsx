import { useSwiper, useSwiperSlide } from "swiper/react";
import { SubCategoryCarouselType } from "../../../../types/subCategoryCarouselType";
import Button from "../../../elements/Button/Button";


type CustomPaginationProps = {
    data: SubCategoryCarouselType[],
    item: SubCategoryCarouselType
}
const CustomPagination = ({ data, item }: CustomPaginationProps) => {

    const swiper = useSwiper();
    const swiperSlide = useSwiperSlide();
    return (
        data.map((slide, index) => {
            return (
                <Button key={index} type="button" variant={`relative  after:absolute after:h-[3px] after:-bottom-1 after:w-0 after:left-0 after:rounded-xl after:hover:w-full after:hover:bg-yellow-400 after:transition-all after:duration-500
                    ${item.name === slide.name && swiperSlide.isActive ?

                        'text-yellow-400 after:w-full after:bg-yellow-400'
                        :

                        ' text-white'

                    } `} onClick={() => {

                        swiper.slideToLoop(index)

                    }}>{slide.name}</Button>
            )
        })
    )
}


export default CustomPagination;