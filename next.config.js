/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@mui/x-charts"],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  env: {
    ENV_PREFIX_PATH: process.env.ENV_PREFIX_PATH,
    ENV_SERVER_PATH: process.env.ENV_SERVER_PATH,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },

  // async rewrites() {
  //   return [
  //     {
  //       source: "/phr/:path*",
  //       destination: "https://phr-dev.devlock.co.kr/:path*",
  //     },
  //     {
  //       source: "/:path*", // 다른 요청은 Next.js 페이지로 리디렉션
  //       destination: "/:path*",
  //     },
  //   ];
  // },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },

  trailingSlash: true,
  images: {
    loader: "akamai",
    path: "/",
    // domains: [""],
  },
};

module.exports = nextConfig;
