const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, 'node_modules/@mediapipe/hands'),
            to: path.join(__dirname, 'public/js/@mediapipe/hands'),
          },
        ],
      })
    );

    const cvConfig = {
      fallback: {
        fs: false,
        path: false,
        crypto: false,
      },
    };

    config = { ...config, resolve: { ...config.resolve, ...cvConfig } };

    return config;
  },
};

module.exports = nextConfig;
