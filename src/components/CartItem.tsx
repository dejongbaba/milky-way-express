import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/slices/cartSlice";

function CartItem({ item }) {
    let [quantity, setQuantity] = useState(item.quantity);

    useEffect(() => {
        setQuantity(item.quantity);
        dispatch(cartActions.SET_ITEM_QUANTITY({ id: item.id, quantity: quantity }));
    }, [item.quantity, quantity, dispatch]);

    const dispatch = useDispatch();
    function reduceQuantity() {
        if (quantity <= 1) {
            removeItem();
        } else {
            setQuantity(quantity - 1);
        }
    }
    function increaseQuantity() {
        setQuantity(quantity + 1);
    }

    function editQuantity(e) {
        setQuantity(parseInt(e.target.value));
    }
    function removeItem() {
        dispatch(cartActions.REMOVE_CART_ITEM(item.id));
    }

    return (
        <>
            <div className="cart-box">
                <div className="overlap-group">
                    <div className="rectangle" />
                    <img className="img" alt="Rectangle" src="45e4635f-1fe1-472b-ae39-5b6cb198fcb0.jpg" />
                    <div className="text-wrapper-2">Milky Lactation Cookies</div>
                    <div className="text-wrapper-3">N4,500</div>
                    <div className="group">
                        <div className="div-wrapper">
                            <div className="text-wrapper-4">1</div>
                        </div>
                        <div className="text-wrapper-5">+</div>
                        <div className="text-wrapper-6">-</div>
                    </div>
                    <img className="delete" alt="Delete" src="d69d4a52-434b-41bf-9c01-09fa7a73c822.jpg" />
                </div>
            </div>
            <div className="flex w-full py-2 px-2 hover:bg-gray-50 rounded-md">
                <div className="flex flex-1">
                    <img src={item.mainPic} className="md:w-32 w-32" alt="" />
                    <div className="pl-2 md:pl-4 flex flex-col md:justify-around justify-start">
                        <div>
                            <h1 className="text-xl md:text-2xl  -mb-2">{item.title}</h1>
                            <p className="text-lg text-gray-400">Plant</p>
                            <p className="text-lg mb-5 text-[#b5c4a8] md:block hidden">{item.price}$</p>
                        </div>

                        <label htmlFor="quantity" className="md:block hidden">
                            Quantity
                            <button
                                onClick={reduceQuantity}
                                className="bg-gray-50 focus:outline-none py-1 w-8 ml-2 border-r-gray-200 border-r   hover:bg-gray-200">
                                -
                            </button>
                            <input
                                max="99"
                                type="number"
                                className="bg-gray-50 focus:outline-none py-1 px-2 w-10 text-center"
                                value={quantity}
                                onBlur={editQuantity}
                            />
                            <button
                                onClick={increaseQuantity}
                                className="bg-gray-50 focus:outline-none py-1 w-8 border-l-gray-200 border-l  hover:bg-gray-200">
                                +
                            </button>
                        </label>
                    </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                    <button onClick={removeItem} className="transition hover:bg-[#7c7c7c2c] p-3 rounded-sm">
                        <img src="/icons/trash-icon-black.svg" className="w-7" alt="" />
                    </button>
                    <p className="ml-10 text-lg">
                        total : <span className=" font-normal">{(item.quantity * item.price).toFixed(2)} $</span>
                    </p>
                </div>
            </div>
        </>
    );
}

export default CartItem;
