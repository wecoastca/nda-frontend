/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    loader: 'default',
    domains: [
      'localhost',
      'morning-chamber-15608.herokuapp.com',
      'res.cloudinary.com',
    ],
    layoutRaw: true,
  },
  async rewrites() {
    return [
      {
        source: '/mailchimp/:path*',
        destination: 'https://us7.api.mailchimp.com/3.0/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
