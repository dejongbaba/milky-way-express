"use client";
import React from "react";
import NavBar from "@/components/NavBar";
import { PaystackButton } from "react-paystack";
import { PaystackProps } from "react-paystack/dist/types";

const OrderPage = () => {
    return (
        <div className="">
            <NavBar />
            <div className=" max-w-3xl m-auto mt-10 grid grid-cols-3 gap-4">
                <div className="col-span-1">
                    <h2>My orders</h2>
                    <p>Input your email to view your order history</p>
                    <div>
                        <div className="items-center rounded-lg flex border border-primary-200 p-3">
                            <div className={` mr-2 w-[150px] h-[150px] bg-[url(/images/svg/logo.svg)] bg-cover `} />
                            <div>
                                <h3>Order #201</h3>
                                <p>Milky Lactation Cookies, Milky Enrich Shakes, Milky Lactation Tea</p>
                            </div>
                            <img className="w-6" src="/images/svg/right-arrow.svg" />
                        </div>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="bg-gray-200 p-5 rounded-lg">
                        <div className="text-center">
                            <img src="/images/svg/logo.svg" alt="logo" />
                        </div>
                        <div className="text-center">
                            <h2>Order #201</h2>
                            <div className="flex justify-around">
                                <div>
                                    <span>Status:</span> <span className="text-gray-500">Paid </span>
                                </div>
                                <div>
                                    <span>Date:</span> <span className="text-gray-500">1-01-2025 </span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-primary p-3 text-white font-bold text-lg">Order summary</div>
                        <div>
                            <div className="flex">
                                <div
                                    style={{ backgroundImage: `url(/images/svg/logo.svg)` }}
                                    className="w-24 h-24 bg-cover"></div>
                                <div className="flex-1 flex ">Milky Enrich Shakes</div>
                                <div className="">NGN 3500</div>
                            </div>
                            <div className="flex">
                                <div
                                    style={{ backgroundImage: `url(/images/svg/logo.svg)` }}
                                    className="w-24 h-24 bg-cover"></div>
                                <div className="flex-1 flex ">Milky Enrich Shakes</div>
                                <div className="">NGN 3500</div>
                            </div>
                            <div className="flex">
                                <div
                                    style={{ backgroundImage: `url(/images/svg/logo.svg)` }}
                                    className="w-24 h-24 bg-cover"></div>
                                <div className="flex-1 flex ">Milky Enrich Shakes</div>
                                <div className="">NGN 3500</div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <p>Subtotal</p>
                                <p>NGN 14,000</p>
                            </div>{" "}
                            <div className="flex justify-between">
                                <p>Shipping</p>
                                <p>NGN 14,000</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Discount</p>
                                <p>NGN 14,000</p>
                            </div>
                            <div className="flex justify-between mt-5">
                                <p className="font-bold ">Total</p>
                                <p className="font-bold ">NGN 14,000</p>
                            </div>
                        </div>
                        <div className="bg-primary text-white p-3 font-bold">Account summary</div>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <p>Firstname</p>
                                <p>John</p>
                            </div>{" "}
                            <div className="flex justify-between">
                                <p>Lastname</p>
                                <p>Stone</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Email</p>
                                <p>ebony@gmail.com</p>
                            </div>
                            <div className="flex justify-between mt-5">
                                <p className="font-bold ">Phone</p>
                                <p className="font-bold ">NGN 14,000</p>
                            </div>{" "}
                            <div className="flex justify-between mt-5">
                                <p className="font-bold ">Address</p>
                                <p className="font-bold ">7 Sdekunle Ajose Street Lekki Lagos Nigeria</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default OrderPage;
