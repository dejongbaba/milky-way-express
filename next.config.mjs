/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        PAYSTACK_PUBLIC_TEST_KEY: process.env.PAYSTACK_PUBLIC_TEST_KEY,
        PAYSTACK_SECRET_TEST_KEY: process.env.PAYSTACK_SECRET_TEST_KEY,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
