"use client";
import React from "react";
import NavBar from "@/components/NavBar";
import { useSelector } from "react-redux";

const OrderPage = () => {
    const user = useSelector((state) => state.user.user);
    //Get the orders by dispatching a get to orders on firebase

    return (
        <div className="">
            <NavBar />
            <div className="max-w-4xl m-auto mt-[150px] grid grid-cols-5 gap-4">
                <div className="col-span-2 space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">My orders</h2>
                        <p className="text-gray-400 text-sm">Input your email to view your order history</p>
                    </div>

                    <div>
                        <div className="items-center rounded-lg transition hover:border hover:border-secondary flex items-center border border-primary-200 p-3">
                            <div className="mr-2 w-[120px] ">
                                <img src="/images/svg/logo.svg" alt="" />
                            </div>
                            <div>
                                <h3 className="font-semibold ">Order #201</h3>
                                <p className="text-gray-400 text-xs ellipses">
                                    Milky Lactation Cookies, Milky Enrich Shakes, Milky Lactation Tea
                                </p>
                            </div>
                            <img className="w-5" src="/images/svg/right-arrow.svg" />
                        </div>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="bg-gray-100 p-10 rounded-lg space-y-4">
                        <div className="flex justify-center">
                            <img src="/images/svg/logo.svg" alt="logo" />
                        </div>
                        <div className="text-center">
                            <h2 className="font-semibold text-2xl mb-3">Order #201</h2>
                            <div className="flex justify-around">
                                <div>
                                    <span>Status:</span> <span className="text-gray-400">Paid </span>
                                </div>
                                <div>
                                    <span>Date:</span> <span className="text-gray-400">1-01-2025 </span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-primary p-3 text-white rounded-lg font-bold text-lg">Order summary</div>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div
                                    style={{ backgroundImage: `url(/images/svg/logo.svg)` }}
                                    className="w-24 h-24 bg-cover"></div>
                                <div className="flex-1 flex ">Milky Enrich Shakes</div>
                                <div className="">NGN 3500</div>
                            </div>
                            <div className="flex items-center">
                                <div
                                    style={{ backgroundImage: `url(/images/svg/logo.svg)` }}
                                    className="w-24 h-24 bg-cover"></div>
                                <div className="flex-1 flex ">Milky Enrich Shakes</div>
                                <div className="">NGN 3500</div>
                            </div>
                            <div className="flex items-center">
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
                        <div className="bg-primary text-white p-3 font-bold rounded-lg">Account summary</div>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <p>Firstname</p>
                                <p className="text-gray-400">{user?.name?.split(" ")?.[0]}</p>
                            </div>{" "}
                            <div className="flex justify-between">
                                <p>Lastname</p>
                                <p className="text-gray-400">{user?.name?.split(" ")?.[1]}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Email</p>
                                <p className="tex-gray-400">{user?.email}</p>
                            </div>
                            <div className="flex justify-between mt-5">
                                <p className=" ">Phone</p>
                                <p className="tex-gray-400 ">{user?.phone}</p>
                            </div>{" "}
                            <div className="flex justify-between mt-5">
                                <p className=" ">Address</p>
                                <p className="tex-gray-400 ">{user?.address}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default OrderPage;
