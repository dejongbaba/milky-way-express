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
import Input from "@/components/input";

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
        <div className="">
            <NavBar />
            <div className="max-w-4xl mt-[150px] m-auto grid grid-cols-2 gap-4">
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
                            <Form className="bg-gray-100 rounded-lg p-5 space-y-3">
                                <h2 className='font-bold text-2xl '>Checkout</h2>
                                <p className='text-gray-400 text-xs'>Complete your purchase by filling the information below</p>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                    <Input  name='firstname' placeholder='firstname' />
                                    </div>
                                    <div>
                                    <Input name='lastname' placeholder='Lastname' />
                                    </div>
                                    <div className='col-span-2'>
                                        <Input  name='phone' placeholder='Phone' />
                                    </div>
                                    <h3 className='text-lg'>Shipping address</h3>
                                    <div className='col-span-2'>
                                        <Input  name='address' placeholder='Address' />
                                    </div>
                                    <div className=''>
                                        <Input  name='state' placeholder='State' />
                                    </div>
                                    <div className=''>
                                        <Input  name='city' placeholder='City' />
                                    </div>
                                    <div className='col-span-2'>
                                        <Input  name='coupon' placeholder='Coupon (optional)' />
                                    </div>

                                    <div>
                                        <PaystackButton {...config} className='bg-primary text-white border-primary rounded ring-transparent focus:outline-none hover:ring-2 disabled:opacity-40 hover:ring-offset-1 hover:ring-primary hover:border-primary hover:text-white'  />
                                    </div>

                                </div>



                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};
export default Page;
