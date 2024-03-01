"use client";
import React from "react";
import NavBar from "@/components/NavBar";
import Cart from "@/components/Cart";

import { NextPage } from "next";
import { useSelector } from "react-redux";
import Payment from "@/components/checkout/Payment";
import AuthUser from "@/components/user/AuthUser";

const Page: NextPage = () => {
    const user = useSelector((state) => {
        console.log("user", state);
        return state.user.user;
    });

    return (
        <div className="">
            <NavBar />
            <div className="max-w-4xl mt-[150px] m-auto grid grid-cols-2 gap-4">
                <Cart />
                {user?.displayName && user?.email ? <Payment /> : <AuthUser />}
            </div>
        </div>
    );
};
export default Page;
