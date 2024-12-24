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
  }
};

export default nextConfig;
