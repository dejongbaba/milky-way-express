"use client";
import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import Cart from "@/components/Cart";

import { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import Payment from "@/components/checkout/Payment";
import AuthUser from "@/components/user/AuthUser";
import { userActions } from "@/store/slices/userSlice";

const Page: NextPage = () => {
    const user = useSelector((state) => {
        console.log("user", state);
        return state.user.user;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.GET_USER());
    }, []);

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
