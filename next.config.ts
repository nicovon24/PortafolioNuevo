import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    /** Evita bug del Segment Explorer en dev (manifest RSC / __webpack_modules__) en Next 15.5.x */
    devtoolSegmentExplorer: false,
  },
};

export default nextConfig;
