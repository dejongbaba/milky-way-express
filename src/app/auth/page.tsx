"use client";
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Cart from "@/components/Cart";
import LogIn from "@/components/user/LogIn";
import SignUp from "@/components/user/SignUp";
import SocialLogin from "@/components/user/SocialLogin";
import { NextPage } from "next";

const AuthPage: NextPage = () => {
    const [login, setLogin] = useState(false);
    const [signup, setSignup] = useState(false);
    const [socialLogin, setSocialLogin] = useState(true);

    const onShowLogin = () => {
        setSignup(false);
        setLogin(true);
        setSocialLogin(false);
    };
    const onShowSignup = () => {
        setSignup(true);
        setLogin(false);
        setSocialLogin(false);
    };
    const onShowSocialLogin = () => {
        setSocialLogin(true);
        setLogin(false);
        setSignup(false);
    };

    return (
        <div className="">
            <NavBar />

            <div className="grid grid-cols-2 gap-4">
                <Cart />
                {login && <LogIn setSocialLogin={onShowSocialLogin} />}
                {signup && <SignUp setSocialLogin={onShowSocialLogin} />}
                {socialLogin && <SocialLogin setLogin={onShowLogin} setSignup={onShowSignup} />}
            </div>
        </div>
    );
};
export default AuthPage;
