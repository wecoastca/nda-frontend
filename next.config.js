/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    loader: 'default',
    domains: ['localhost', 'morning-chamber-15608.herokuapp.com'],
    layoutRaw: true,
  },
};

module.exports = nextConfig;
