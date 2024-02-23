/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: false, // true
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
    // ENV_SERVER_PATH: process.env.ENV_SERVER_PATH,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },

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
  // i18n: {
  //   locales: ["ko", "en"],
  //   defaultLocale: "ko",
  // },
};

module.exports = nextConfig;
