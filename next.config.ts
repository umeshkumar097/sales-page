import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/zoom-reseller-in-:country',
        destination: '/landing/zoom-reseller/:country',
      },
      {
        source: '/web-development-agency-in-:city',
        destination: '/landing/web-development/:city',
      },
      {
        source: '/mobile-app-development-company-in-:city',
        destination: '/landing/mobile-app-development/:city',
      }
    ];
  },
};

export default nextConfig;
