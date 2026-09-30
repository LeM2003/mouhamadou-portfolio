import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Pas de page index /projects : les études de cas vivent sous /projects/[slug].
      { source: "/projects", destination: "/#projects", permanent: true },
    ];
  },
};

export default nextConfig;
