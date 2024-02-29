'use client'
import React from "react";
import "./breakdown.css";

export const OrderComplete = () => {
    return (
        <div className="order-complete">
            <div className="order-successful-wrapper">
                <div className="order-successful">
                    <div className="overlap">
                        <div className="cost-breakdown">
                            <div className="div">
                                <div className="text-wrapper">Subtotal</div>
                                <div className="text-wrapper-2">N14,000</div>
                            </div>
                            <div className="cost-breakdown-2">
                                <div className="text-wrapper-3">Total</div>
                                <div className="text-wrapper-4">N15,000</div>
                            </div>
                            <div className="cost-breakdown-3">
                                <div className="text-wrapper">Shipping</div>
                                <div className="text-wrapper-2">N1,500</div>
                            </div>
                            <div className="cost-breakdown-4">
                                <div className="text-wrapper">Discount</div>
                                <div className="text-wrapper-2">-N500</div>
                            </div>
                        </div>
                        <div className="account-info">
                            <div className="div">
                                <div className="text-wrapper">First Name</div>
                                <div className="text-wrapper-5">John</div>
                            </div>
                            <div className="cost-breakdown-3">
                                <div className="text-wrapper">Last Name</div>
                                <div className="text-wrapper-5">Stone</div>
                            </div>
                            <div className="cost-breakdown-4">
                                <div className="text-wrapper">Email</div>
                                <div className="text-wrapper-6">stonejohn@gmail.com</div>
                            </div>
                            <div className="cost-breakdown-5">
                                <div className="text-wrapper">Phone</div>
                                <div className="text-wrapper-6">+2349049337263</div>
                            </div>
                            <div className="cost-breakdown-6">
                                <div className="text-wrapper">Address</div>
                                <p className="p">7 Sdekunle Ajose Street Lekki Lagos Nigeria</p>
                            </div>
                        </div>
                        <div className="cart-box">
                            <img className="rectangle" alt="Rectangle" src="9f8315d8-d2ca-489b-a401-c21ca4f6b812.jpg" />
                            <div className="text-wrapper-7">Milky Lactation Cookies</div>
                            <div className="text-wrapper-8">N4,500</div>
                        </div>
                        <div className="cart-box-2">
                            <img className="rectangle" alt="Rectangle" src="4f986363-f85b-4ca2-af20-28882bdaffd1.jpg" />
                            <div className="text-wrapper-7">Milky Enrich Shakes</div>
                            <div className="text-wrapper-8">N3,500</div>
                        </div>
                        <div className="cart-box-3">
                            <img className="rectangle" alt="Rectangle" src="deb0a825-7a88-4e59-af45-abe9683d1349.jpg" />
                            <div className="text-wrapper-7">Milky Lactation Tea</div>
                            <div className="text-wrapper-8">N6,000</div>
                        </div>
                        <div className="logo">
                            <img className="logo-milky" alt="Logo milky" src="259e5287-0c80-40df-8c3a-9b977f610b28.jpg" />
                        </div>
                        <div className="text-wrapper-9">Order #201</div>
                        <div className="group">
                            <div className="overlap-group">
                                <div className="text-wrapper-10">Order Summary</div>
                            </div>
                        </div>
                        <div className="overlap-wrapper">
                            <div className="div-wrapper">
                                <div className="text-wrapper-10">Account Summary</div>
                            </div>
                        </div>
                        <div className="status">
                            <div className="overlap-2">
                                <div className="text-wrapper-11">Status:</div>
                                <img className="check" alt="Check" src="6cc1d0c4-a5e4-4662-b4b0-3dd3373f11e0.jpg" />
                            </div>
                            <div className="text-wrapper-12">Paid</div>
                            <div className="overlap-3">
                                <div className="text-wrapper-11">Date:</div>
                                <div className="text-wrapper-13">1-02-2021</div>
                            </div>
                        </div>
                        <div className="print">
                            <div className="overlap-4">
                                <div className="status-2">
                                    <div className="text-wrapper-14">Back to shop</div>
                                    <div className="text-wrapper-15">Print</div>
                                </div>
                                <img className="printer" alt="Printer" src="c5117ba8-a753-498e-819f-be988f0d7fe8.jpg" />
                            </div>
                            <img className="arrow" alt="Arrow" src="fb6169ee-9dcf-4165-9999-0effb4b7c77f.jpg" />
                        </div>
                    </div>
                    <header className="header">
                        <img className="img" alt="Logo milky" src="4973cea9-688f-4172-9821-90187e592b35.jpg" />
                        <div className="text-wrapper-16">MY ORDER</div>
                        <div className="text-wrapper-17">HOME</div>
                        <div className="overlap-group-wrapper">
                            <div className="overlap-group-2">
                                <div className="text-wrapper-18">Cart</div>
                                <div className="text-wrapper-19">3 Items</div>
                            </div>
                        </div>
                        <img className="group-2" alt="Group" src="30fc198e-02e9-4500-a0fa-db002031c9aa.jpg" />
                    </header>
                </div>
            </div>
        </div>
    );
};
export default  OrderComplete
