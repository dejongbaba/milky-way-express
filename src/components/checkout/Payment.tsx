import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {uuidv4} from "@firebase/util";
import Input from "@/components/input";
import {PaystackButton} from "react-paystack";
import {PaystackProps} from "react-paystack/dist/types";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import {userActions} from "@/store/slices/userSlice";

type referenceObj = {
    message: string;
    reference: string;
    status: "sucess" | "failure";
    trans: string;
    transaction: string;
    trxref: string;
};
function Payment(props) {
    const ref = useRef();
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => {
        console.log("user", state);
        return state.user.user;
    });
    console.log('userr',user)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(userActions.GET_USER())
    },[])
    const initialValues = {
        firstname: user?.displayName?.split(' ')?.[0],
        lastname: user?.displayName?.split(' ')?.[1],
        email: user?.email,
        phone: "",
        address: "",
        country: "",
        state: "",
        city: "",
    };

    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required("This field is required! "),
        lastname: Yup.string().required("This field is required! "),
        email: Yup.string().required("This field is required! "),
        phone: Yup.string().required("This field is required! "),
        address: Yup.string().required("This field is required! "),
        country: Yup.string().required("This field is required! "),
        state: Yup.string().required("This field is required! "),
        city: Yup.string().required("This field is required! "),
    });

    const onSuccess = (reference: referenceObj) => {
        // const res = await fetch(`/api/verify/${reference.reference}`);
        // const verifyData = await res.json();
        console.log("ref", reference);

        // if (verifyData.data.status === "success") {
        ref.current.resetForm();

        dispatch(createOrder())
        // }
    };
    const values = ref.current?.values;
    const total = cart.cartItems.map((c) => c.quantity * c.price).reduce((a, b) => a + b, 0) || 0;
    console.log("total", total);
    const config: PaystackProps = {
        reference: uuidv4(),
        email: values?.email,
        firstname:values?.firstname,
        lastname:values?.lastname,
        label: user?.displayName,
        amount: (total * 100).toFixed(2) || 0,
        publicKey: process.env.PAYSTACK_PUBLIC_TEST_KEY as string,
        currency: "NGN",
        onSuccess: onSuccess,
        callback: onSuccess,
        onClose: () => {},
    };

    console.log("config", config);
    return (
        <Formik
            innerRef={ref}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log("got here to submit ");
            }}>
            {({ values,dirty,isValid ,errors,isSubmitting}) => {
                console.log('isValid',values,dirty,errors,isValid)
                return (
                    <Form className="bg-gray-100 rounded-lg p-5 space-y-6">
                        <div>
                            <h2 className="font-bold text-2xl mb-2">Checkout</h2>
                            <p className="text-gray-400 text-xs ">
                                Complete your purchase by filling the information below
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Input name="firstname" placeholder="firstname" />
                            </div>
                            <div>
                                <Input name="lastname" placeholder="Lastname" />
                            </div>
                            <div className="col-span-2">
                                <Input name="phone" placeholder="Phone" />
                            </div> <div className="col-span-2">
                                <Input name="email" placeholder="Email" />
                            </div>
                            <h3 className="text-lg">Shipping address</h3>
                            <div className="col-span-2">
                                <Input name="address" placeholder="Address" />
                            </div><div className="col-span-2">
                                <Input name="country" placeholder="Country" />
                            </div>
                            <div className="">
                                <Input name="state" placeholder="State" />
                            </div>
                            <div className="">
                                <Input name="city" placeholder="City" />
                            </div>
                            <div className="col-span-2">
                                <Input name="coupon" placeholder="Coupon (optional)" />
                            </div>
                            {cart?.cartItems?.length ? (
                                <div className="mt-3 p-3 space-y-4 rounded-md col-span-2 ">
                                    <div className="flex justify-between">
                                        <p>Subtotal</p>
                                        <p>{cart?.total?.toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Delivery</p>
                                        <p>1,500 NGN</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Discount</p>
                                        <p>0 NGN</p>
                                    </div>
                                    <div>
                                        <div className="flex justify-between my-3">
                                            <p className="text-black font-semibold text-xl">TOTAL</p>
                                            <p className="text-black font-semibold text-xl">{total + 1500} NGN</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                            {isValid ?<div className="col-span-2">
                                <PaystackButton
                                    {...config}
                                    className="bg-primary text-white w-full py-2 border-primary rounded ring-transparent focus:outline-none hover:ring-2 disabled:opacity-40 hover:ring-offset-1 hover:ring-primary hover:border-primary hover:text-white">
                                    Checkout
                                </PaystackButton>
                            </div> :<div className="col-span-2">
                                <button type="submit" disabled={isSubmitting || !isValid}
                                    className="bg-primary text-white w-full py-2 border-primary rounded ring-transparent focus:outline-none hover:ring-2 disabled:opacity-40 hover:ring-offset-1 hover:ring-primary hover:border-primary hover:text-white">
                                    Checkout
                                </button>
                            </div>}

                            <p className="col-span-2 text-gray-400 mt-3 text-center text-xs">
                                Payments are secure and encrypted
                            </p>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default Payment;
