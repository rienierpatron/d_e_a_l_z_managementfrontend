/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/index",
        destination: "/",
        permanent: true,
      },
      {
        source: "/signin",
        destination: "/",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'cdn.yourpave.com', 'cdn-staging.yourpave.com'],
  },
  reactStrictMode: false
};
export default nextConfig;
