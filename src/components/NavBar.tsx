"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { cartActions } from "@/store/slices/cartSlice";

function NavBar() {
    const router = useRouter();
    const [itemAdded, setItemAdded] = useState(false);

    const cartCount = useSelector((state) => state.cart.cartItems).length;

    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        if (cartCount != 0) {
            setItemAdded(true);
            setTimeout(() => {
                setItemAdded(false);
            }, 1000);
        }
    }, [cartCount]);

    const changeBackground = () => {
        if (window.scrollY >= 100 || router.pathname != "/") {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };
    // useEffect(() => {
    //     window.addEventListener("scroll", changeBackground);
    //     changeBackground();
    // });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(cartActions.GET_CART_ITEMS());
    }, []);

    return (
        <nav className="bg-white px-5 fixed top-0 w-full z-20  transition-all">
            <div className="max-w-4xl m-auto  flex  items-center justify-between">
                <div className="flex items-center">
                    {/*{scrolled ? (*/}
                    {/*    <Link href="/">*/}
                    {/*        <img className="w-36 pt-2 mr-16 cursor-pointer" src="/images/svg/logo.svg" alt="" />*/}
                    {/*    </Link>*/}
                    {/*) : (*/}
                    <Link href="/">
                        <img className="w-36 pt-2 mr-16 cursor-pointer" src="/images/svg/logo.svg" alt="" />
                    </Link>
                    {/*)}*/}
                </div>

                <ul className="flex gap-5 items-center space-x-3 ">
                    <li className="uppercase">
                        <Link href="/">Home</Link>
                        {/*<span className={`${router.pathname === "/" ? 'w-1/2' : 'w-0'}  h-[1px] ${scrolled ? 'bg-black' : 'bg-white'} absolute top-[26px] left-0 group-hover:w-1/2 transition-all`}></span>*/}
                    </li>
                    <li className="uppercase">
                        <Link href="/order">My Orders</Link>
                        {/*<span className={`${router.pathname === "/orders" ? 'w-1/2' : 'w-0'}  h-[1px] ${scrolled ? 'bg-black' : 'bg-white'} absolute top-[26px] left-0 group-hover:w-1/2 transition-all`}></span>*/}
                    </li>

                    <li>
                        <Link href="/checkout" className={`flex items-center  p-1  transition cursor-pointer`}>
                            <img src="/images/svg/cart-icon.svg" alt="cart icon" className="mr-2" />
                            <div>
                                <h4 className="font-bold">Cart</h4>
                                <p className="">{cartCount} items</p>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
