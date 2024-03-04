import React, { useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/config/firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "@/components/input";

function SignUp({ setSocialLogin }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const initialValues = {
        name: "",
        phone: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(""),
        phone: Yup.string().required(""),
        email: Yup.string().required(""),
        password: Yup.string().required(""),
    });

    const userConnected = useSelector((state) => state.user.connected);

    useEffect(() => {
        if (userConnected) {
            router.replace("/");
        }
    }, [userConnected]);
    function createAccount(values) {
        const { name, email, password, phone } = values;
        // e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user;

                const userCol = collection(db, "users");
                await addDoc(userCol, {
                    uid: user.uid,
                    email: user.email,
                    password,
                    phone,
                    name,
                });
                dispatch(signIn({ email, password }));

                // ...
            })
            .catch((error) => {
                // ..
            });
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
                                            <Input name="name" />
                                        </div>
                                        <div className="relative">
                                            <Input name="email" />
                                        </div>

                                        <div className="relative">
                                            <Input name="phone" placeholder="Phone" />
                                        </div>
                                        <div className="relative">
                                            <Input type="password" name="password" placeholder="Password" />
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
