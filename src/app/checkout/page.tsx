"use client";
import React, {useEffect, useRef, useState} from "react";
import NavBar from "@/components/NavBar";
import Cart from "@/components/Cart";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import {NextPage} from "next";
import {PaystackButton} from "react-paystack";
import {PaystackProps} from "react-paystack/dist/types";
import {useDispatch, useSelector} from "react-redux";
import {uuidv4} from "@firebase/util";


type referenceObj = {
    message: string;
    reference: string;
    status: "sucess" | "failure";
    trans: string;
    transaction: string;
    trxref: string;
};
const Page: NextPage = () => {

    const ref  = useRef();
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
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

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        async function getCountries() {
            fetch("https://restcountries.com/v3.1/all")
                .then((res) => {
                    return res.json();
                })
                .then((data) => setCountries(data));
        }
        getCountries();
    }, []);



    const onSuccess = async (reference: referenceObj) => {
        const res = await fetch(`/api/verify/${reference.reference}`);
        const verifyData = await res.json();

        dispatch(createOrder())
        // if (verifyData.data.status === "success") {
            ref.current.resetForm()
        // }
    };
    return (
        <div className="max-w-3xl m-auto">
            <NavBar />
            <div className="grid grid-cols-2 gap-4">
                <Cart />
                <Formik ref={ref} initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => {




                }}>
                    {({values}) => {
                        const config: PaystackProps = {
                            reference: uuidv4(),
                            email: values.email,
                            firstname: values.firstname,
                            lastname: values.lastname,
                            label: values.firstname + " " + values.lastname,
                            amount: (cart.total * 100) | 0,
                            publicKey: process.env.PAYSTACK_PUBLIC_TEST_KEY as string,
                            currency: "NGN",
                            callback:onSuccess
                        };


                        return (
                            <Form className="bg-gray-500">
                                <div></div>


                                <PaystackButton {...config}  />
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};
export default Page;
