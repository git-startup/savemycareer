import type { NextConfig } from "next";
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    domains: ['iptvstreamline.com'],
  },
};

// Fixed the variable name from "extConfig" to "nextConfig"
export default withNextIntl(nextConfig);