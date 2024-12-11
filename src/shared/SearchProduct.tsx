"use client";

import scss from "./SearchProduct.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DebounceInput } from "react-debounce-input";
import { RxCross1 } from "react-icons/rx";
import { FiSearch } from "react-icons/fi";
import { FaFirefoxBrowser } from "react-icons/fa";
import useSearchStore from "@/stores/useSearchStrore";

const SearchProducts = () => {
    const router = useRouter();
    const [hasUserInput, setHasUserInput] = useState(false);
    const { searchQuery, setSearchQuery } = useSearchStore();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setHasUserInput(true);
    };

    useEffect(() => {
        if (hasUserInput) {
            if (searchQuery) {
                router.push(`/search/${searchQuery}`);
            }
        }
    }, [searchQuery, hasUserInput, router]);

    return (
        <div className={scss.LookForTracks}>
            <div className={scss.content}>
                {/* <div className={scss.search_icon_block}>
          <button>
            <FiSearch />
          </button>
        </div> */}
                <div className={scss.search_input_block}>
                    <DebounceInput
                        placeholder="Поиск книг..."
                        minLength={2}
                        debounceTimeout={300}
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => router.push(`/search`)}
                    />
                </div>
                <div className={scss.search_reset_block}>
                    {searchQuery ? (
                        <button onClick={() => setSearchQuery("")}>
                            <FiSearch />
                            {/* <RxCross1 /> */}
                        </button>
                    ) : (
                        <button>
                            <FiSearch />
                            {/* <FaFirefoxBrowser /> */}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchProducts;
