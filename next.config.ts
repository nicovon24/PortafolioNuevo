import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90, 95, 100],
  },

  experimental: {
    /** Evita bug del Segment Explorer en dev (manifest RSC / __webpack_modules__) en Next 15.5.x */
    devtoolSegmentExplorer: false,
  },

  /* Los .svg de src/assets se importan como componentes React (SVGR), no como URLs.
     Eso permite que hereden el color via `currentColor` y evita un request por icono.
     Hay que declararlo dos veces: Turbopack corre en dev, webpack en build. */
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
