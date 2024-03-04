"use client";
import NavBar from "@/components/NavBar";
import Shop from "@/components/products/Shop";
import { useSelector } from "react-redux";
import { STATUSES } from "@/store/slices/itemsSlice";
import Loader from "@/components/Loader";

export default function Home() {
    // let { status } = useSelector((state) => {
    //     return state.items;
    // });
    //
    // if (status == STATUSES.LOADING) {
    //     return <Loader />;
    // }
    return (
        <main className=" min-h-screen">
            <NavBar />
            <Shop />
        </main>
    );
}
