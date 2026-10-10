import type { Metadata } from "next";

// Layout requis car page.tsx est un Client Component (pas d'export metadata possible).
// Démo pédagogique interactive — utile aux visiteurs, non destinée à l'indexation.
export const metadata: Metadata = {
  title: "Lab RAG — Mouhamadou Diouf",
  description:
    "Démonstration pédagogique du RAG : chunking, retrieval déterministe et génération ancrée sur les projets de Mouhamadou Diouf.",
  robots: { index: false, follow: true },
};

export default function LabRagLayout({ children }: { children: React.ReactNode }) {
  return children;
}
