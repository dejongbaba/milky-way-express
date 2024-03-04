import React, { useEffect } from "react";
import { signIn } from "@/store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import Input from "@/components/input";

function LogIn({ setSocialLogin }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const userConnected = useSelector((state) => state.user.connected);
    const connectionError = useSelector((state) => state.user.connectionError);

    useEffect(() => {
        if (userConnected) {
            router.replace("/");
        }
    }, [userConnected]);

    async function signin(email, password) {
        dispatch(signIn({ email, password }));
    }

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.email().required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    return (
        <div className="min-h-screen w-full  flex justify-center items-center ">
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={(values) => {
                    const { email, password } = values;
                    signin(email, password);
                }}>
                {() => {
                    return (
                        <Form>
                            <div className="md:px-52 px-5 gap-3 flex md:gap-20 w-full justify-center">
                                <div className="flex-1">
                                    <h1 className="text-4xl">Login</h1>
                                    <p className="text-gray-500">Login to complete your order</p>
                                    <form className="w-full flex flex-col md:text-xl md:mt-20 mt-10 md:gap-10 gap-5 md:w-[470px]">
                                        {userConnected && (
                                            <div className="w-full py-3 bg-green-200 text-green-600 flex justify-center items-center">
                                                You have successfully logged in !
                                            </div>
                                        )}
                                        {connectionError && (
                                            <div className="w-full py-3 bg-red-200 text-red-600 flex justify-center items-center">
                                                This account could not be found.
                                            </div>
                                        )}
                                        <div className="relative">
                                            <Input name="email" placeholder="Email" />
                                        </div>
                                        <div className="relative">
                                            <Input name="password" placeholder="Password" />
                                        </div>

                                        <button
                                            // onClick={signin}
                                            type="submit"
                                            className="bg-primary rounded-xl px-6 py-3 text-white hover:bg-gray-300">
                                            Login
                                        </button>
                                    </form>
                                    <p
                                        className="pt-5 font-normal underline cursor-pointer text-gray-500 text-center "
                                        onClick={() => setSocialLogin()}>
                                        Continue with Google or Facebook
                                    </p>
                                </div>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}

export default LogIn;
