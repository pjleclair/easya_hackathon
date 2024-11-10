/** @type {import('next').NextConfig} */
const nextConfig = {};
nextConfig.images = {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**',
    },
  ],
},
module.exports = nextConfig;
