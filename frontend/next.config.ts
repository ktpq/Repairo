/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    allowedDevOrigins: [
      "http://localhost:3000",
      "http://app-alb-449523791.us-east-1.elb.amazonaws.com",
    ],
  },
};
module.exports = nextConfig;