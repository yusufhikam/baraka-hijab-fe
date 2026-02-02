"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";

import useDebounce from "@/hooks/useDebouce";
import { Activity, useEffect, useState } from "react";

const SearchBarInput: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");

  const debouncedValue = useDebounce(searchValue, 500);

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    const initialSearch = searchParams.get("search") || "";

    if (initialSearch === debouncedValue) return;

    if (debouncedValue) {
      newSearchParams.set("search", debouncedValue);
    } else {
      newSearchParams.delete("search");
    }

    newSearchParams.delete("page");

    router.push(`?${newSearchParams.toString()}`, { scroll: false });
  }, [debouncedValue, router, searchParams]);

  return (
    <div className="relative w-full sm:mt-0">
      <Input
        type="text"
        name="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="font-geist focus-visible:ring-baraka-primary-300 sm:focus-visible:ring-ring ring-baraka-lightgreen-200 rounded-xs bg-white ps-4 pe-8 font-medium text-black shadow-lg ring placeholder:text-black/50 focus:ring sm:ring-0"
        placeholder="Find your perfect piece"
      />

      <Activity mode={searchValue ? "hidden" : "visible"}>
        <SearchIcon
          size={20}
          className="absolute inset-y-1/2 right-2 -translate-y-1/2 text-zinc-400"
        />
      </Activity>
      <Activity mode={searchValue ? "visible" : "hidden"}>
        <XIcon
          onClick={() => setSearchValue("")}
          size={20}
          className="absolute inset-y-1/2 right-2 -translate-y-1/2 cursor-pointer text-zinc-400 hover:text-zinc-500"
        />
      </Activity>
    </div>
  );
};

export default SearchBarInput;
