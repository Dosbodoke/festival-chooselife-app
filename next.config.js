/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "54321",
        pathname: "/**",
      },
    ],
    domains: [
      process.env.NEXT_PUBLIC_SUPABASE_URL.replace(/(^\w+:|^)\/\//, ""),
    ],
  },
};

module.exports = nextConfig;
