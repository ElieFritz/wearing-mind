import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'vbunghyafwsubpjvrvju.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    // Disable private IP check for development
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Allow all domains during development (remove in production)
    unoptimized: false,
  },
  // Disable IP private check
  experimental: {
    allowedRevalidateHeaderKeys: [],
  },
};

export default nextConfig;
