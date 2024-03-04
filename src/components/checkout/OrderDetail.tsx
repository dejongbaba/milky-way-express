import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatNumber } from "@/utils/utils";
import { userActions } from "@/store/slices/userSlice";

function OrderDetail({ order: selected }) {
    const user = useSelector((state) => {
        return state.user.user;
    });
    const dispatch = useDispatch();

    console.log("selected", selected);
    useEffect(() => {
        dispatch(userActions.GET_USER());
    }, []);
    return selected ? (
        <>
            <div className="bg-gray-100 p-10 rounded-lg space-y-4">
                <div className="flex justify-center">
                    <img src="/images/svg/logo.svg" alt="logo" />
                </div>
                <div className="text-center">
                    <h2 className="font-semibold text-2xl mb-3">Order #{selected?.uid || ""}</h2>
                    <div className="flex justify-around text-xs">
                        <div>
                            <span>Status:</span> <span className="text-gray-400">{selected?.status || "Paid"} </span>
                        </div>
                        <div>
                            <span>Date:</span> <span className="text-gray-400">{selected?.date || "1-01-2025"} </span>
                        </div>
                    </div>
                </div>
                <div className="bg-primary p-3 text-white rounded-lg font-bold text-lg">Order summary</div>
                <div className="space-y-4">
                    {(selected?.items?.length &&
                        selected?.items?.map((i) => {
                            return (
                                <div className="flex items-center">
                                    <div
                                        style={{
                                            backgroundImage: i.image ? `url(${i.image})` : `url(/images/svg/logo.svg)`,
                                        }}
                                        className="w-[60px] h-[60px] rounded-lg bg-cover mr-2"></div>
                                    <div className="flex-1 flex ">{i.title}</div>
                                    <div className="">NGN {i.price}</div>
                                </div>
                            );
                        })) ||
                        "No items available"}
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <p>Subtotal</p>
                        <p>NGN {formatNumber(selected.subtotal) || "0.00"}</p>
                    </div>{" "}
                    <div className="flex justify-between">
                        <p>Shipping</p>
                        <p>NGN {formatNumber(selected.delivery) || "0.00"}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Discount</p>
                        <p>NGN {formatNumber(selected.discount) || "0.00"}</p>
                    </div>
                    <div className="flex justify-between mt-5">
                        <p className="font-bold ">Total</p>
                        <p className="font-bold ">NGN {formatNumber(selected.total) || "0.00"}</p>
                    </div>
                </div>
                <div className="bg-primary text-white p-3 font-bold rounded-lg">Account summary</div>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <p>Firstname</p>
                        <p className="text-gray-400">{user?.displayName?.split(" ")?.[0]}</p>
                    </div>{" "}
                    <div className="flex justify-between">
                        <p>Lastname</p>
                        <p className="text-gray-400">{user?.displayName?.split(" ")?.[1]}</p>
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
        </>
    ) : (
        <div className=""><h2 className='text-center my-4 text-2xl font-semibold'>No order selected yet</h2></div>
    );
}

export default OrderDetail;
