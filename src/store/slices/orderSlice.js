"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/config/firebase-config";
import { fetchProducts, STATUSES } from "@/store/slices/itemsSlice";

export const signIn = createAsyncThunk("user/signin", async ({ email, password }) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;

    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const userInfos = await getDocs(q);
    // userInfos.forEach((doc) => {
    //     dispatch(userSlice.actions.SIGN_IN({ ...doc.data(), docId: doc.id }));
    //
    //     // const localData = JSON.stringify({ email: email, password: password });
    //     // localStorage.setItem("account", localData);
    // });
    return userInfos;
});
// export function signIn(email, password) {
//     return async (dispatch) => {
//
//             .then(async (userCredential) => {
//                 // Signed in
//
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 dispatch(userSlice.actions.SET_ERROR(errorCode));
//             });
//     };
// }

export const signInWithGoogle = createAsyncThunk("user/sign-in-google", async () => {
    // try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const userInfos = await getDocs(q);
    return userInfos;
    // userInfos.forEach((doc) => {
    //     dispatch(userSlice.actions.SIGN_IN({ ...doc.data(), docId: doc.id }));
    //     const localData = JSON.stringify(user);
    //     localStorage.setItem("account", localData);
    // });
    // }catch (error) {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     dispatch(userSlice.actions.SET_ERROR(errorCode));
    // }
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
                userInfos.forEach((doc) => {
                    state.userInfo = { ...doc.data(), docId: doc.id };
                    const localData = JSON.stringify(userInfos);
                    localStorage.setItem("account", localData);
                });
            })
            .addCase(signInWithGoogle.rejected, (state, action) => {
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
