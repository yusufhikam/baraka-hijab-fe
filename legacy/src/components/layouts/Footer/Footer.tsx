import useDarkMode from "../../../utililties/customHook/useDarkMode";
import NavLinks from "../Navbars/NavLinks";

const Footer = () => {
    const { isDarkMode } = useDarkMode();
    return (
        <div className={`${isDarkMode ? 'bg-barakaprimary-madder text-barakaprimary-snow' : 'bg-gray-950 text-white'} pt-5`}>
            <div className="flex flex-col text-center sm:text-left sm:flex-row gap-5 mb-20 justify-between mx-5 ">
                <div className="">
                    <h1 className="text-xl font-krona-one-regular">Shop</h1>
                    <p className="font-krub-light">New Arrival</p>
                    <p className="font-krub-light">Hijabs</p>
                    <p className="font-krub-light">Woman</p>
                </div>
                <div className="">
                    <h1 className="text-xl font-krona-one-regular">About Us</h1>
                    <p className="font-krub-light">Help Center</p>
                    <p className="font-krub-light">Contact</p>
                    <p className="font-krub-light">Privacy Policy</p>
                    <p className="font-krub-light">More Info</p>
                </div>
                <div className="">
                    <h1 className="text-xl font-krona-one-regular">Store</h1>
                </div>
            </div>

            <div className="social-media flex justify-center gap-5">
                <NavLinks to="/instagram.com/yukaaa.e" isDarkMode={isDarkMode} withPseudoAfter={false}>
                    <i className={`pi pi-instagram text-5xl md:text-3xl    rounded-full p-2 transition-all duration-300  ${isDarkMode ? 'hover:bg-barakaprimary-snow hover:text-black' : 'hover:bg-barakaprimary-madder hover:text-white'}`}></i>
                </NavLinks>
                <NavLinks to="/instagram.com/yukaaa.e" isDarkMode={isDarkMode} withPseudoAfter={false}>
                    <i className={`pi pi-facebook text-5xl md:text-3xl   rounded-full p-2 transition-all duration-300 ${isDarkMode ? 'hover:bg-barakaprimary-snow hover:text-black' : 'hover:bg-barakaprimary-madder hover:text-white'}`}></i>
                </NavLinks>
                <NavLinks to="/instagram.com/yukaaa.e" isDarkMode={isDarkMode} withPseudoAfter={false}>
                    <i className={`pi pi-whatsapp text-5xl md:text-3xl   rounded-full p-2 transition-all duration-300 ${isDarkMode ? 'hover:bg-barakaprimary-snow hover:text-black' : 'hover:bg-barakaprimary-madder hover:text-white'} `}></i>
                </NavLinks>
            </div>
            {isDarkMode && <hr className="mt-4 border-gray-500" />}

            <div className={`${isDarkMode ? 'bg-barakaprimary-madder' : 'bg-gray-950 text-white mt-4'} py-4 `}>
                <p className="text-center">Copyright &copy; 2023. All Rights Reserved</p>
            </div>
        </div>
    )
}


export default Footer;