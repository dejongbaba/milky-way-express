"use client";
import React from "react";
import { useState } from "react";
import FiltersSection from "@/components/products/FiltersSection";
import ItemsSection from "@/components/products/ItemsSection";

function Shop() {
    const [filterss, setFilterss] = useState({});
    const [search, setSearch] = useState("");

    function takeFilters(filters) {
        setFilterss(filters);
    }

    function takeSearch(search) {
        setSearch(search);
    }

    return (
        <div className="max-w-4xl m-auto flex  pt-32 pb-10 gap-5  flex-col">
            <FiltersSection takeFilters={takeFilters} takeSearch={takeSearch} />
            <ItemsSection filterss={filterss} search={search} />
        </div>
    );
}

export default Shop;
