const webpack = require('webpack');

module.exports = {
  // Other configurations...
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals.push('bufferutil', 'utf-8-validate');
    }
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com", // Replace with your external image domain
      },
      {
        protocol: "https",
        hostname: "www.images.unsplash.com", // Add multiple domains if needed
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Add multiple domains if needed
      },
    ],
  },
};
