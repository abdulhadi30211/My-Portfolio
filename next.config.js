/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  output: 'standalone', // Changed from 'export' to 'standalone' for better env support
  swcMinify: true, // Re-enable SWC minification
  compiler: {
    styledComponents: true
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
  // Exclude admin pages from static generation if needed
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
}
