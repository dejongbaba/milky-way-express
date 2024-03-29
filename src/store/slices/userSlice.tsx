"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "@/config/firebase-config";
import { STATUSES } from "@/store/slices/itemsSlice";

export const signIn = createAsyncThunk("user/signin", async ({ email, password }) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;

    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const userInfos = await getDocs(q);
    return userInfos;
});
export const signUp = createAsyncThunk("user/signup", async ({ email, password }) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    return res;
});

export const signInWithGoogle = createAsyncThunk("user/sign-in-google", async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        return user;
    } catch (error) {}
});

export const signOutGoogle = createAsyncThunk("user/sign-out", async () => {
    const res = await signOut(auth);
    return res;
});

const initialState = {
    connected: false,
    connectionNote: false,
    connectionError: "",
    userInfo: {},
    user: {
        username: "",
        uid: "",
    },
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        GET_USER(state) {
            if (localStorage.getItem("account")) {
                state.user = JSON.parse(localStorage.getItem("account"));
            }
        },
        SIGN_IN(state, { payload }) {
            state.connected = true;
            state.connectionNote = true;
            state.user = { ...payload };
        },
        SET_ERROR(state, { payload }) {
            state.connectionError = payload;
        },

        SIGN_OUT(state) {
            state.connected = false;
            state.user = {
                username: "",
                uid: "",
            };
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(signIn.fulfilled, (state, action) => {
                const userInfos = action.payload;
                state.user = userInfos;
                state.status = STATUSES.IDLE;
                userInfos.forEach((doc) => {
                    state.userInfo = { ...doc.data(), docId: doc.id };
                    const localData = JSON.stringify(userInfos);
                    localStorage.setItem("account", localData);
                });
            })
            .addCase(signIn.rejected, (state, action) => {
                state.itemsItems = action.payload;
                state.status = STATUSES.ERROR;
            })
            .addCase(signInWithGoogle.fulfilled, (state, action) => {
                const userInfos = action.payload;
                state.user = userInfos;
                state.status = STATUSES.IDLE;
                console.log("state", state, userInfos);
                // state.userInfo = { ...doc.data(), docId: doc.id };
                const localData = JSON.stringify(userInfos);
                localStorage.setItem("account", localData);
                // userInfos.forEach((doc) => {
                //
                // });
            })
            .addCase(signInWithGoogle.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                const userInfos = action.payload;
                state.user = userInfos.user;
                state.status = STATUSES.IDLE;
                const localData = JSON.stringify(userInfos);
                localStorage.setItem("account", localData);
            })
            .addCase(signUp.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
            .addCase(signOutGoogle.fulfilled, (state, action) => {
                state.user = {};
                state.status = STATUSES.IDLE;
            })
            .addCase(signOutGoogle.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    },
});
export default userSlice.reducer;
export const userActions = userSlice.actions;
