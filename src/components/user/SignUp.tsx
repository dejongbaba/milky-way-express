import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/config/firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { useSelector } from "react-redux";
import { signIn } from "@/store/slices/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "@/components/input";

function SignUp({ setSocialLogin }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [PError, setPError] = useState(false);
    const [username, setUsername] = useState("");
    const [EError, setEError] = useState(false);
    const [UError, setUError] = useState(false);
    const initialValues = {
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        country: "",
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required(""),
        lastName: Yup.string().required(""),
        phone: Yup.string().required(""),
        address: Yup.string().required(""),
        country: Yup.string().required(""),
    });

    const userConnected = useSelector((state) => state.user.connected);

    useEffect(() => {
        if (userConnected) {
            router.replace("/");
        }
    }, [userConnected]);
    function createAccount(values) {
        const { username, email } = values;
        // e.preventDefault();
        if (username != "") {
            setUError(false);
            if (email != "" && email.includes(".")) {
                setEError(false);
                if (password != "" && password.length >= 6) {
                    createUserWithEmailAndPassword(auth, email, password)
                        .then(async (userCredential) => {
                            // Signed in
                            const user = userCredential.user;

                            const userCol = collection(db, "users");
                            await addDoc(userCol, {
                                uid: user.uid,
                                username: username,
                                email: user.email,
                                wishlist: [],
                            });
                            dispatch(signIn(email, password));

                            // ...
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            alert(errorMessage);
                            // ..
                        });
                } else {
                    setPError(true);
                }
            } else {
                setEError(true);
            }
        } else {
            setUError(true);
        }
    }

    return (
        <div className="min-h-screen w-full text-black flex justify-center items-center ">
            <div className="md:px-52 px-5 gap-3 flex md:gap-20 w-full justify-center items-start">
                {/*<div className="md:w-72  w-24 bg-[url(/images/Bathroom.jpg)] bg-cover bg-left"></div>*/}
                <div className="flex-1 md:flex-initial">
                    <div className="space-y-2">
                        <h1 className="text-4xl">Sign Up</h1>
                        <h1 className="text-gray-500 text-sm">Sign Up to get started</h1>
                    </div>

                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values) => {
                            createAccount(values);
                        }}
                        validationSchema={validationSchema}>
                        {() => {
                            return (
                                <Form>
                                    <div className="w-full flex flex-col md:text-xl md:mt-20 mt-10 gap-5 md:w-[470px]">
                                        <div className="relative">
                                            <Input name="email" />
                                            {/*<input*/}
                                            {/*    placeholder="Email"*/}
                                            {/*    type="email"*/}
                                            {/*    name="email"*/}
                                            {/*    id="email"*/}
                                            {/*    className={`border border-1 border-gray-400 rounded-xl focus:bg-gray-200 hover:bg-gray-200 pl-12 py-3 ${UError && "border-[0.7px] border-red-500"} outline-none  w-full`}*/}
                                            {/*    onChange={(e) => setUsername(e.target.value)}*/}
                                            {/*/>*/}
                                            {/*{UError && (*/}
                                            {/*    <p className="text-red-500">*/}
                                            {/*        You can&apos;t leave the username empty !*/}
                                            {/*    </p>*/}
                                            {/*)}*/}
                                            {/*<img*/}
                                            {/*    className="w-6 absolute top-10 left-3"*/}
                                            {/*    src="/icons/user-icon-black.svg"*/}
                                            {/*    alt=""*/}
                                            {/*/>*/}
                                        </div>
                                        <div className="relative">
                                            <Input name="phone" placeholder="Phone" />
                                            {/*<input*/}
                                            {/*    placeholder="enter your email"*/}
                                            {/*    type="email"*/}
                                            {/*    name="email"*/}
                                            {/*    id="email"*/}
                                            {/*    className={`border border-1 border-gray-400 rounded-xl focus:bg-gray-200 hover:bg-gray-200 pl-12 py-3 outline-none  w-full ${EError && "border-[0.7px] border-red-500"}`}*/}
                                            {/*    onChange={(e) => setEmail(e.target.value)}*/}
                                            {/*/>*/}
                                            {/*{EError && <p className="text-red-500">this email is invalid !</p>}*/}

                                            {/*<img*/}
                                            {/*    className="w-6 absolute top-10 left-3"*/}
                                            {/*    src="/icons/mail-icon-black.svg"*/}
                                            {/*    alt=""*/}
                                            {/*/>*/}
                                        </div>
                                        <div className="relative">
                                            <Input type="password" name="password" placeholder="Password" />
                                            {/*<input*/}
                                            {/*    placeholder="enter your password"*/}
                                            {/*    type="password"*/}
                                            {/*    name="pass"*/}
                                            {/*    id="pass"*/}
                                            {/*    className={`border border-1 border-gray-400 rounded-xl focus:bg-gray-200 hover:bg-gray-200 pl-12 py-3 outline-none w-full ${PError && "border-[0.7px] border-red-500"}`}*/}
                                            {/*    onChange={(e) => setPassword(e.target.value)}*/}
                                            {/*/>*/}
                                            {/*{PError && (*/}
                                            {/*    <p className="text-red-500">*/}
                                            {/*        Password must contain at least 6 characters !*/}
                                            {/*    </p>*/}
                                            {/*)}*/}

                                            {/*<img*/}
                                            {/*    className="w-6 absolute top-10 left-3"*/}
                                            {/*    src="/icons/lock-icon-black.svg"*/}
                                            {/*    alt=""*/}
                                            {/*/>*/}
                                        </div>

                                        <button
                                            // onClick={createAccount}
                                            type="submit"
                                            className="bg-primary rounded-lg px-6 py-3 text-white ">
                                            Sign Up
                                        </button>
                                        <p
                                            className="font-bold text-gray-500 font-bold underline text-center text-sm cursor-pointer"
                                            onClick={() => setSocialLogin()}>
                                            Continue with Google or Facebook
                                        </p>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
