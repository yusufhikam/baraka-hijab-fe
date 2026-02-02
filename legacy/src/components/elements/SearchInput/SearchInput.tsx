import { Search } from "lucide-react";
import useColorProfile from "../../../utililties/customHook/useColorProfile";

type SearchInputProps = {
    isDarkMode: boolean,
    variant?: string,
    variant_input?: string,
    iconSize?: number,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value?: string
}
const SearchInput = ({ isDarkMode, variant, variant_input, iconSize, value, onChange }: SearchInputProps) => {

    return (
        <div className={`flex items-center  rounded-lg ${variant} ${useColorProfile({ isDarkMode })}`}>
            <input type="text" value={value} name="search" onChange={onChange} placeholder="Search" className={`${variant_input} w-full p-3 font-poppins-bold rounded-s-lg tracking-wider text-barakaprimary-madder focus:ring focus:ring-barakaprimary-madder focus:outline-none`} />


            <Search size={iconSize} className="mx-3" />

        </div>
    )
}


export default SearchInput;