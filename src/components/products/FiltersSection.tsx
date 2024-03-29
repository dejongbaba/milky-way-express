import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/store/slices/itemsSlice";

function FiltersSection({ takeFilters, takeSearch }) {
    const search = useRef();
    const dispatch = useDispatch();

    const categories = useSelector((state) => state.items.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    function filterS() {
        takeSearch(search.current.value);
    }

    return (
        <>
            <div className=" pt-20  w-full flex justify-between  ">
                <input
                    className="h-12  transition-all pr-20 appearance-none  rounded-md py-2 px-4  leading-tight focus:outline-none bg-[#d9d9d927] border-gray-200 text-lg text-black focus:bg-[#d9d9d941] hover:bg-[#d9d9d941] focus:border-none"
                    id="inline-full-name"
                    type="text"
                    placeholder="Search"
                    onChange={(e) => filterS()}
                    ref={search}
                />
                {/*<button onClick={filterS} className=' bg-[#bcbcbc41] hover:bg-[#aaaaaa48] py-3 px-3 rounded-md absolute right-0 top-0'/>*/}
                <div className=" pt-2 pb-3 ">
                    <select
                        name="category"
                        className="h-12 w-full transition-all pr-20 appearance-none  rounded-md py-2 px-4  leading-tight focus:outline-none bg-[#d9d9d927] border-gray-200 text-lg text-black focus:bg-[#d9d9d941] hover:bg-[#d9d9d941] focus:border-none"
                        id="category">
                        <option value="">Select category</option>
                        {categories?.length &&
                            categories.map((c) => {
                                return <option value={c}>{c}</option>;
                            })}
                    </select>
                </div>
            </div>
        </>
    );
}

export default FiltersSection;
