"use client";
import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase-config";
import Loader from "@/components/Loader";
import OrderDetail from "@/components/checkout/OrderDetail";

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [selected, setSelected] = useState();
    const [loading, setLoading] = useState(true);
    //Get the orders by dispatching a get to orders on firebase
    async function getOrders() {
        const itemsRefrence = collection(db, "order");
        const itemsDocs = await getDocs(itemsRefrence);
        console.log("items", itemsDocs);
        const data = [
            ...itemsDocs.docs.map((doc) => {
                return { ...doc.data(), uid: doc.id };
            }),
        ];
        console.log("docs", data);
        setOrders(data);
        setLoading(false);
    }

    const onSelectOrder = (order) => {
        setSelected(order);
    };

    useEffect(() => {
        getOrders();
    }, []);

    if (loading) {
        return <Loader />;
    }
    return (
        <div className="">
            <NavBar />
            <div className="max-w-4xl m-auto my-[150px] grid grid-cols-5 gap-4">
                {orders?.length ? (
                    <>
                        <div className="col-span-2 space-y-6">
                            <div>
                                <h2 className="text-xl font-semibold mb-2">My orders</h2>
                                <p className="text-gray-400 text-sm">Input your email to view your order history</p>
                            </div>

                            <div>
                                {orders?.length &&
                                    orders.map((o) => {
                                        return (
                                            <div
                                                onClick={() => onSelectOrder(o)}
                                                className="items-center rounded-lg transition hover:border hover:border-secondary flex items-center border border-primary-200 p-3">
                                                <div className="mr-2 w-[100px] ">
                                                    <img
                                                        src={
                                                            o.items?.[0]?.image
                                                                ? o.items?.[0]?.image
                                                                : "/images/png/no-image.jpeg"
                                                        }
                                                        alt="order history"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold no-wrap ellipses truncate ">
                                                        Order #{o.uid}
                                                    </h3>
                                                    <p className="text-gray-400 text-xs ellipses">
                                                        {!!o?.items?.length && o?.items?.map((i) => i.title).join(", ")}
                                                    </p>
                                                </div>
                                                <img className="w-5" src="/images/svg/right-arrow.svg" />
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                        <div className="col-span-3">
                            <OrderDetail order={selected} />
                        </div>
                    </>
                ) : (
                    <div className="col-span-5 flex justify-center items-center">
                        <h2 className="text-3xl font-semibold"> No orders made yet.</h2>
                    </div>
                )}
            </div>
        </div>
    );
};
export default OrderPage;
