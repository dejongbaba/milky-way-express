"use client";
import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import SectionItem from "@/components/products/SectionItem";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchProduct, fetchProducts } from "@/store/slices/itemsSlice";
import { cartActions } from "@/store/slices/cartSlice";
import { NextPage } from "next";
import { RootState } from "@/store/store";

type ProductPage = {
    params: { [key: string]: string };
};
const Page: NextPage<ProductPage> = ({ params: { id } }) => {
    const router = useRouter();
    // const id = router.query.id;
    const dispatch = useDispatch();

    const [items, setItems] = useState([]);
    const [singleProduct, setSingleProduct]: any = useState({});
    const { itemsItems: products, product } = useSelector((state: RootState) => {
        console.log("state", state);
        return state.items;
    });
    const cartItems = useSelector((state: RootState) => {
        console.log("cart", state);
        return state.cart.cartItems;
    });
    const cartItem = cartItems?.length && cartItems.find((c: any) => c.id == id);
    const relatedProducts = products.filter((p: any) => p.id !== id);

    useEffect(() => {
        dispatch(fetchProduct(id));
        dispatch(fetchProducts());
    }, []);
    useEffect(() => {
        setItems(relatedProducts);
    }, [products]);

    useEffect(() => {
        setSingleProduct(product);
    }, [product]);

    async function addToCart(event) {
        event.stopPropagation();
        dispatch(
            cartActions.ADD_TO_CART({
                id: id,
                title: singleProduct.title,
                price: singleProduct.price,
                category: singleProduct.category,
                quantity: 1,
                total: singleProduct.price,
                image: singleProduct.image,
            })
        );
    }
    async function reduceQuantity(event) {
        event.stopPropagation();
        dispatch(
            cartActions.REDUCE_ITEM_QUANTITY({
                id: id,
            })
        );
    }

    async function removeFromCart(event) {
        event.stopPropagation();
        dispatch(
            cartActions.REMOVE_CART_ITEM({
                id: id,
            })
        );
    }
    console.log("cartItem", cartItem);
    return (
        <div className="">
            <NavBar />
            <div className="space-y-4">
                <div className="m-auto max-w-4xl product-detail mt-[200px] grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <img
                            src={singleProduct.image}
                            className="border border-1 border-gray-500 rounded-lg"
                            alt={singleProduct.title}
                        />
                        <div className="grid grid-cols-3 gap-3">
                            <div
                                style={{ "--image-url": `url(${singleProduct.image})` }}
                                className={` h-24 bg-secondary bg-[image:var(--image-url)] bg-cover`}
                            />
                            <div
                                style={{ "--image-url": `url(${singleProduct.image})` }}
                                className={` h-24 bg-secondary bg-[image:var(--image-url)] bg-cover`}
                            />
                            <div
                                style={{ "--image-url": `url(${singleProduct.image})` }}
                                className={` h-24 bg-secondary bg-[image:var(--image-url)] bg-cover`}
                            />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">{singleProduct.title}</h2>
                        <p className="text-2xl ">{singleProduct.price} NGN</p>
                        <p className="text-sm text-gray-500 ">{singleProduct.description}</p>
                        <div className="flex justify-between">
                            <button onClick={addToCart} className="rounded-lg bg-primary text-white px-5 py-2 ">
                                Add to cart
                            </button>
                            <div className="flex items-center space-x-3">
                                <button onClick={addToCart} className="text-2xl">
                                    +
                                </button>
                                <span className="border border-1 border-gray-400 px-3 py-2 rounded-lg">
                                    {cartItem?.quantity || "0"}
                                </span>
                                {cartItem?.quantity ? (
                                    <button onClick={reduceQuantity} className="text-2xl">
                                        -
                                    </button>
                                ) : (
                                    <button onClick={removeFromCart} className="text-2xl">
                                        -
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="  product-related bg-secondary py-10">
                    <div className="max-w-4xl m-auto space-y-6">
                        <h2 className="text-center text-2xl font-bold ">Related products</h2>
                        <div className="grid grid-cols-4 gap-4">
                            {!!items?.length &&
                                items.slice(0, 4).map((i) => {
                                    return (
                                        <SectionItem
                                            key={i.id}
                                            id={i.id}
                                            description={i.description}
                                            title={i.title}
                                            category={i.category}
                                            price={i.price}
                                            image={i.image}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
