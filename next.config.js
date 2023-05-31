/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "dummyimage.com",
      process.env.NEXT_PUBLIC_SUPABASE_URL.replace(/(^\w+:|^)\/\//, ""),
    ],
  },
};

module.exports = nextConfig;
