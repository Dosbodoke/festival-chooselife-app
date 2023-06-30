const withPWA = require("@imbios/next-pwa")({
  dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "dummyimage.com",
      process.env.NEXT_PUBLIC_SUPABASE_URL.replace(/(^\w+:|^)\/\//, ""),
    ],
  },
};

module.exports = withPWA(nextConfig);
