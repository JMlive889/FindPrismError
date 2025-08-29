/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_OWNER_PHONE: process.env.OWNER_PHONE,
    NEXT_PUBLIC_OWNER_EMAIL: process.env.OWNER_EMAIL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLIC_KEY,
  }
};

module.exports = nextConfig;