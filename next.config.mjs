/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [new URL('https://raw.githubusercontent.com/**')],
    },
};

export default nextConfig;
