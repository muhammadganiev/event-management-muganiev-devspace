/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add any needed configuration here
  webpack: (config, { isServer }) => {
    // Improve module resolution for builds
    config.resolve.fallback = {
      ...config.resolve.fallback,
    };

    // Enhanced module resolution to handle case sensitivity
    config.resolve.symlinks = false;

    return config;
  },
  // Disable static export for App Router APIs
  output: "standalone",
  experimental: {
    // Enable better module resolution
    esmExternals: true,
  },
};

module.exports = nextConfig;
