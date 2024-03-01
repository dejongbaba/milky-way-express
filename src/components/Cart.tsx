import React, { useEffect, useState } from "react";
import CartItem from "@/components/CartItem";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "@/store/slices/cartSlice";
import Link from "next/link";

function Cart() {
    const [total, setTotal] = useState(0);
    const dispatch = useDispatch();
    const userConnected = useSelector((state) => state.user.connected);
    const cartItems = useSelector((state) => state.cart.cartItems);
    useEffect(() => {
        dispatch(cartActions.GET_CART_ITEMS());
    }, []);

    useEffect(() => {
        if (cartItems[0]) {
            const eachTotal = cartItems.map((iteme) => parseInt(iteme.quantity) * parseFloat(iteme.price));
            setTotal(eachTotal.reduce((a, b) => a + b));
        }
    }, [cartItems]);

    console.log('cart',cartItems)
    return (
        <>
            <div className=" w-full  text-black bg-white  min-h-screen px-5 ">
                {/*<button onClick={setShow} className={`w-16 h-16  p-3 transition hover:bg-[#7c7c7c2c]`}>*/}
                {/*    <img className="w-20" src="/icons/remove-icon-black.svg" alt="" />*/}
                {/*</button>*/}
                <div className='border-b border-gray-300 pb-4'>
                    <Link href="/">
                        <button className="text-sm">
                            &lt;    Continue shopping
                        </button>
                    </Link>
                </div>

                <div className="pt-5">
                    <div
                        className={`text-black flex flex-col gap-5 w-full mt-8 ${cartItems && cartItems.length > 3 && "overflow-y-scroll"}  h-[65vh]`}>
                        {cartItems.length ? (
                            cartItems.map((item) => {
                                return <CartItem item={item} key={item.id} />;
                            })
                        ) : (
                            <div className="text-gray-500  flex flex-col gap-10 justify-center items-center text-lg text-center">
                                You still haven&apos;t added anything to the cart yet :&apos;({" "}
                                {/*<Link href="/">*/}
                                {/*    <button className="px-10  rounded-lg transition  bg-primary text-white  py-5 text-sm">*/}
                                {/*        Continue shopping*/}
                                {/*    </button>*/}
                                {/*</Link>*/}
                            </div>
                        )}
                    </div>
                    {cartItems.length ? (
                        <div className="mt-3 flex justify-between items-center p-3 rounded-md bg-gray-50 ">
                            <Link href={{ pathname: userConnected ? "/checkout" : "/login" }}>
                                <button
                                    // onClick={setShow}
                                    className="px-6 py-4 bg-primary rounded-lg text-white md:text-[18px] text-[16px]">
                                    Check out
                                </button>
                            </Link>
                            <p className="text-black font-semibold md:text-[20px] text-[17px]">
                                TOTAL : {total.toFixed(2)} NGN
                            </p>
                        </div>
                    ) : (
                        ""
                    )}
                </div>

            </div>
        </>
    );
}

export default Cart;
