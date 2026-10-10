import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const BASE = "https://mouhamadou-portfolio.vercel.app";

// Pages retenues selon leur contenu et leur vocation :
// exclues /card (carte de visite, noindex) et /lab/rag (démo interactive, noindex).
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/collaboration`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/now`, changeFrequency: "weekly", priority: 0.5 },
  ];
  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE}/projects/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  return [...staticRoutes, ...projectRoutes];
}
