"use client";
import React from "react";
import NavBar from "@/components/NavBar";
import Cart from "@/components/Cart";
import { NextPage } from "next";

const AuthPage: NextPage = () => {
    return (
        <div className="">
            <NavBar />

            <div className="grid grid-cols-2 gap-4">
                <Cart />
            </div>
        </div>
    );
};
export default AuthPage;
