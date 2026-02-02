import CarouselHomeProduct from '../components/fragments/HomePage/Carousel/CarouselHomeProduct'
import Hero from '../components/fragments/HomePage/Hero/Hero'
import NewArrivals from '../components/fragments/HomePage/NewArrivals/NewArrivals'

function HomePage() {
    return (
        <div>
            <Hero />
            <NewArrivals />
            <CarouselHomeProduct />
        </div>
    )
}

export default HomePage
