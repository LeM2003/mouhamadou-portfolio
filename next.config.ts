import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/now", destination: "/#projects", permanent: true },
      { source: "/card", destination: "/#projects", permanent: true },
      { source: "/services", destination: "/#projects", permanent: true },
      { source: "/collaboration", destination: "/#projects", permanent: true },
      { source: "/lab/rag", destination: "/#projects", permanent: true },
      { source: "/projects", destination: "/#projects", permanent: true },
    ];
  },
};

export default nextConfig;
