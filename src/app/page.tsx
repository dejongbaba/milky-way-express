import { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Shop from "@/components/products/Shop";

export const metadata: Metadata = {
    title: "Milky way express",
    description: "an ecommerce application to buy milk drinks",
};

export default function Home() {
    return (
        <main className=" min-h-screen">
            <NavBar />
            <Shop />
        </main>
    );
}
