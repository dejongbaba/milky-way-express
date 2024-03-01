"use client";
import {createAsyncThunk, createSlice, Draft} from "@reduxjs/toolkit";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/config/firebase-config";

export enum STATUSES {
    IDLE = "idle",
    ERROR = "error",
    LOADING = "loading",
}

const itemsInitialState = {
    itemsItems: [],
    categories: [],
    product: {},
    status: STATUSES.IDLE,
};

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return data;
});
export const fetchProduct = createAsyncThunk("product/fetch", async (id:number) => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await res.json();
    return data;
});

export const fetchCategories = createAsyncThunk("categories/fetch", async () => {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    const data = await res.json();
    return data;
});

export function getItems() {
    return async (dispatch) => {
        const itemsRefrence = collection(db, "items");
        const itemsDocs = await getDocs(itemsRefrence);
        const data = [
            ...itemsDocs.docs.map((doc) => {
                return { ...doc.data(), uid: doc.id };
            }),
        ];
        dispatch(itemsSlice.actions.SET_STORE_ITEMS(data));
    };
}

const itemsSlice = createSlice({
    name: "items",
    initialState: itemsInitialState,
    reducers: {
        SET_STORE_ITEMS(state, { payload }) {
            state.itemsItems = [...payload];
        },
        SET_ITEMS(state, { payload }) {
            if (payload.op == 1) {
                state.itemsItems = state.itemsItems.map((item) =>
                    item.id == payload.id ? { ...item, loves: item.loves + 1 } : item
                );
            } else if (payload.op == 0) {
                state.itemsItems = state.itemsItems.map((item) =>
                    item.id == payload.id ? { ...item, loves: item.loves - 1 } : item
                );
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state:any, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchProducts.fulfilled, (state:any, action) => {
                state.itemsItems = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchProduct.fulfilled, (state:any, action) => {
                state.product = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchProducts.rejected, (state:any, action) => {
                state.status = STATUSES.ERROR;
            })
            .addCase(fetchCategories.fulfilled, (state:any, action) => {
                state.categories = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchCategories.pending, (state:any, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchCategories.rejected, (state:any, action) => {
                state.status = STATUSES.ERROR;
            });
    },
});

export default itemsSlice.reducer;
export const itemsActions = itemsSlice.actions;
