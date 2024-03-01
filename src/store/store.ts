"use client";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cartSlice from "@/store/slices/cartSlice";
import itemsSlice from "@/store/slices/itemsSlice";
import userSlice from "@/store/slices/userSlice";

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        user: userSlice,
        items: itemsSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
