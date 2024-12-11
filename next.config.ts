import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ["127.0.0.1", "localhost", "www.google.com"], // Разрешаем оба домена
    },
};

export default nextConfig;
