import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/slices/cartSlice";

function CartItem({ item }) {
    let [quantity, setQuantity] = useState(item.quantity);
    const dispatch = useDispatch();

    useEffect(() => {
        setQuantity(item.quantity);
    }, [item.quantity]);

    function reduceQuantity() {
        if (quantity <= 1) {
            removeItem();
        } else {
            setQuantity(quantity - 1);
        }
    }
    function increaseQuantity() {
        setQuantity(quantity + 1);
        dispatch(cartActions.SET_ITEM_QUANTITY({ id: item.id, quantity: quantity + 1 }));
    }

    function editQuantity(e) {
        setQuantity(parseInt(e.target.value));
    }
    function removeItem() {
        dispatch(cartActions.REMOVE_CART_ITEM(item.id));
    }

    return (
        <>
            <div className="flex w-full py-2 px-2 hover:bg-secondary rounded-md">
                <div className="flex flex-1 items-center">
                    <img src={item.image} className="w-24" alt="" />
                    <div className="pl-2 flex md:justify-around justify-start">
                        <div>
                            <h1 className="text-xs">{item.title}</h1>
                            <p className="text-xs">{item.price} NGN</p>
                        </div>

                        <label htmlFor="quantity" className="flex items-center justify-self">
                            <button onClick={reduceQuantity} className=" focus:outline-none py-1 w-8 ml-2    ">
                                -
                            </button>
                            <input
                                max="99"
                                type="number"
                                className="border border-gray-300 rounded-lg focus:outline-none py-1 px-2 w-10 text-center"
                                value={quantity}
                                onBlur={editQuantity}
                            />
                            <button onClick={increaseQuantity} className=" focus:outline-none py-1 w-8    ">
                                +
                            </button>
                        </label>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                        <button onClick={removeItem} className=" p-3 rounded-sm">
                            <img src="/images/svg/delete.svg" className="w-12 hover:text-primary transition" alt="" />
                        </button>
                        {/*<p className="ml-10 text-lg">*/}
                        {/*    total : <span className=" font-normal">{(item.quantity * item.price).toFixed(2)} $</span>*/}
                        {/*</p>*/}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartItem;
