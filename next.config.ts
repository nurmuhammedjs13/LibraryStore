// next.config.js

module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "13.60.43.72",
                port: "",
                pathname: "/media/**",
            },
        ],
    },
};
