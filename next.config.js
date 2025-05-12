/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add any needed configuration here
  webpack: (config, { isServer }) => {
    // Improve module resolution for builds
    config.resolve.fallback = {
      ...config.resolve.fallback,
    };

    return config;
  },
};

module.exports = nextConfig;
