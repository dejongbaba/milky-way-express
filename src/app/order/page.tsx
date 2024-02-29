'use client'
import React from "react";
import NavBar from '@/components/NavBar';

export const OrderPage = () => {
    return (
        <div className="order-page">
            <div className="orders-page-wrapper">
                <div className="orders-page">
                    <NavBar/>
                    <div className="overlap">
                        <div className="cost-breakdown">
                            <div className="cost-breakdown-2">
                                <div className="text-wrapper-4">Subtotal</div>
                                <div className="text-wrapper-5">N14,000</div>
                            </div>
                            <div className="cost-breakdown-3">
                                <div className="text-wrapper-6">Total</div>
                                <div className="text-wrapper-7">N15,000</div>
                            </div>
                            <div className="cost-breakdown-4">
                                <div className="text-wrapper-4">Shipping</div>
                                <div className="text-wrapper-5">N1,500</div>
                            </div>
                            <div className="cost-breakdown-5">
                                <div className="text-wrapper-4">Discount</div>
                                <div className="text-wrapper-5">-N500</div>
                            </div>
                        </div>
                        <div className="account-info">
                            <div className="cost-breakdown-2">
                                <div className="text-wrapper-4">First Name</div>
                                <div className="text-wrapper-8">John</div>
                            </div>
                            <div className="cost-breakdown-4">
                                <div className="text-wrapper-4">Last Name</div>
                                <div className="text-wrapper-8">Stone</div>
                            </div>
                            <div className="cost-breakdown-5">
                                <div className="text-wrapper-4">Email</div>
                                <div className="text-wrapper-9">stonejohn@gmail.com</div>
                            </div>
                            <div className="cost-breakdown-6">
                                <div className="text-wrapper-4">Phone</div>
                                <div className="text-wrapper-9">+2349049337263</div>
                            </div>
                            <div className="cost-breakdown-7">
                                <div className="text-wrapper-4">Address</div>
                                <p className="p">7 Sdekunle Ajose Street Lekki Lagos Nigeria</p>
                            </div>
                        </div>
                        <div className="cart-box">
                            <img className="rectangle" alt="Rectangle" src="d46de50f-9612-4322-a660-6910f6959158.jpg" />
                            <div className="text-wrapper-10">Milky Lactation Cookies</div>
                            <div className="text-wrapper-11">N4,500</div>
                        </div>
                        <div className="cart-box-2">
                            <img className="rectangle" alt="Rectangle" src="5f42829a-adf9-45e2-8592-ee4c7fa5c77d.jpg" />
                            <div className="text-wrapper-10">Milky Enrich Shakes</div>
                            <div className="text-wrapper-11">N3,500</div>
                        </div>
                        <div className="cart-box-3">
                            <img className="rectangle" alt="Rectangle" src="edb0e734-b64c-454c-9505-c54bebb2a83d.jpg" />
                            <div className="text-wrapper-10">Milky Lactation Tea</div>
                            <div className="text-wrapper-11">N6,000</div>
                        </div>
                        <div className="logo">
                            <img className="img" alt="Logo milky" src="b99d650e-9566-482b-8f25-731acc98f01c.jpg" />
                        </div>
                        <div className="text-wrapper-12">Order #201</div>
                        <div className="overlap-wrapper">
                            <div className="div-wrapper">
                                <div className="text-wrapper-13">Order Summary</div>
                            </div>
                        </div>
                        <div className="overlap-group-wrapper">
                            <div className="overlap-2">
                                <div className="text-wrapper-13">Account Summary</div>
                            </div>
                        </div>
                        <div className="status">
                            <div className="overlap-3">
                                <div className="text-wrapper-14">Status:</div>
                                <img className="check" alt="Check" src="1c2a8547-db76-4b2e-86ec-250c00736fa4.jpg" />
                            </div>
                            <div className="text-wrapper-15">Paid</div>
                            <div className="overlap-4">
                                <div className="text-wrapper-14">Date:</div>
                                <div className="text-wrapper-16">1-02-2021</div>
                            </div>
                        </div>
                        <div className="print">
                            <div className="overlap-5">
                                <div className="text-wrapper-17">Print</div>
                                <img className="printer" alt="Printer" src="8082c950-c5bb-4e27-9334-539d89759205.jpg" />
                            </div>
                        </div>
                    </div>
                    <div className="my-orders-section">
                        <div className="text-wrapper-18">My orders</div>
                        <p className="text-wrapper-19">Input your email to view your order history</p>
                        <div className="cart-box-4">
                            <div className="overlap-group-2">
                                <div className="rectangle-2" />
                                <img className="rectangle-3" alt="Rectangle" src="85cb1c56-29da-424b-8c14-1347f68e2955.jpg" />
                                <div className="text-wrapper-20">Order #201</div>
                                <p className="text-wrapper-21">Milky Lactation Cookies, Milky Enrich Shakes, Milky Lactation Tea</p>
                                <img className="arrow" alt="Arrow" src="ae7731a5-cef1-47dd-936d-c3e31d469e31.jpg" />
                            </div>
                        </div>
                        <div className="cart-box-5">
                            <div className="overlap-6">
                                <div className="rectangle-4" />
                                <img className="rectangle-5" alt="Rectangle" src="a0b9f2b7-b9f2-4945-86af-863f2d4f48b1.jpg" />
                                <div className="text-wrapper-22">Order #204</div>
                                <div className="text-wrapper-23">Milky Storage Bag</div>
                                <img className="arrow-2" alt="Arrow" src="076ab153-4755-45a6-b064-8f34e8fea155.jpg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default  OrderPage
