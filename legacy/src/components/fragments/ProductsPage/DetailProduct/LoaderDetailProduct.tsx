const LoaderDetailProduct = () => (
    <>
        <div className="product-images hidden md:basis-3/5  md:flex gap-3 h-[80vh] animate-pulse">
            <div className="active-photo basis-10/12 bg-gray-500"></div>
            <div className="nav-photo  basis-1/5 flex flex-col gap-y-3 max-h-[40vh] md:max-h-[80vh]">
                <div className="bg-gray-500 h-36"></div>
                <div className="bg-gray-500 h-36"></div>
                <div className="bg-gray-500 h-36"></div>
            </div>
        </div>
        <div className="block md:hidden mx-auto w-3/4 bg-gray-500 h-96"></div>
        
        <div className="product-info w-full md:basis-1/3 p-5 md:p-0 animate-pulse">
            <div className="bg-gray-500 h-5 mb-5 w-1/2"></div>
            <div className="bg-gray-500 h-5 w-1/3 mb-20"></div>
            <div className="bg-gray-500 h-60 mb-5"></div>
            <div className="bg-gray-500 h-14"></div>
        </div>
    </>
)

export default LoaderDetailProduct