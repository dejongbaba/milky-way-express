import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/store/slices/cartSlice";

function SectionItem({ title, image, category, description, price, id }) {
    const dispatch = useDispatch();
    // const userConnected = useSelector((state) => state.user.connected);
    // const userUid = useSelector((state) => state.user.user.docId);
    // const userWish = useSelector((state) => state.user.user.wishlist);
    const item = useSelector((state) => state.items.itemsItems).find((item) => item.id == id);

    async function addToCart(event) {
        event.stopPropagation();
        dispatch(cartActions.ADD_TO_CART({ id: id, title, price, category, quantity: 1, total: price, image }));
    }
    // async function addToWish(e) {
    //     e.stopPropagation();
    //     if (userConnected) {
    //         const itemRefrence = doc(db, "users", userUid);
    //         if (userWish.find((item) => parseInt(item) == id)) {
    //             dispatch(userActions.ADD_TO_WISH(id));
    //             await updateDoc(itemRefrence, { wishlist: userWish.filter((item) => parseInt(item) != id) });
    //             await dispatch(retrieveLove(id, item.uid, item.loves));
    //         } else {
    //             dispatch(userActions.ADD_TO_WISH(id));
    //             await updateDoc(itemRefrence, { wishlist: [...userWish, id] });
    //             await dispatch(addLove(id, item.uid, item.loves));
    //         }
    //     } else {
    //         dispatch(uiActions.showProfile());
    //     }
    // }

    return (
        <Link href={`/product/${id}`}>
            <div className=" space-y-4 border border-gray-200 rounded-lg h-[350px]  p-3 transition  text-black flex flex-col bg-white cursor-pointer group">
                <img src={image} className="w-[80%] h-[150px] object-cover" alt={title} />
                <div className="">
                    <div>
                        <h1 className="text-sm font-semibold  group-hover:text-primary transition">{title}</h1>
                    </div>
                    <p className=" text-sm text-gray-400 truncate">{description}</p>
                </div>
                <div className="flex justify-between">
                    <p className="font-bold text-sm py-2 ">{price} NGN</p>
                    <div className=" items-center">
                        <button
                            className=" rounded-lg px-3 flex-auto transition text-white bg-primary   py-2 text-sm "
                            onClick={addToCart}>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default SectionItem;
