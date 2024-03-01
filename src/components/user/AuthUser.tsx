import React, { useState } from "react";
import LogIn from "@/components/user/LogIn";
import SignUp from "@/components/user/SignUp";
import SocialLogin from "@/components/user/SocialLogin";

function AuthUser(props) {
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
        <>
            {login && <LogIn setSocialLogin={onShowSocialLogin} />}
            {signup && <SignUp setSocialLogin={onShowSocialLogin} />}
            {socialLogin && <SocialLogin setLogin={onShowLogin} setSignup={onShowSignup} />}
        </>
    );
}

export default AuthUser;
