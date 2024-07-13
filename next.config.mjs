import { env } from 'process';

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      APIKEY: process.env.APIKEY,
    },
};

export default nextConfig;