"use client";

import { useState } from "react";
import Link from "next/link";

export type FeaturedProject = {
  slug: string;
  name: string;
  tag: string;
  angle: string;
  need: string;
  role: string;
  proof: string;
};

export function FeaturedProjects({ items }: { items: FeaturedProject[] }) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div>
      {/* Index — boutons avec état sélectionné, accessibles au clavier */}
      <div
        role="tablist"
        aria-label="Sélectionner une réalisation"
        className="flex flex-wrap gap-2 mb-8 md:mb-12"
      >
        {items.map((p, i) => (
          <button
            key={p.slug}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`font-mono text-xs uppercase tracking-[0.15em] px-4 py-2 border transition-colors ${
              i === active
                ? "border-[#8CA5FF] text-[#F5F5F1]"
                : "border-[#383D40] text-[#9aa0a3] hover:border-[#8CA5FF] hover:text-[#F5F5F1]"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[58fr_42fr] gap-10 md:gap-16 items-start">
        {/* Couverture éditoriale — composition typographique originale, fondée sur le nom du projet */}
        <div
          className="aspect-[4/3] bg-[#212528] border border-[#383D40] flex flex-col justify-between p-8 md:p-12"
          aria-hidden
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8CA5FF]">
            {current.tag}
          </div>
          <div className="font-[family-name:var(--font-display)] italic text-5xl md:text-7xl text-[#F5F5F1] leading-none">
            {current.name}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#9aa0a3]">
            Étude de cas · {current.slug}
          </div>
        </div>

        <div>
          <p className="text-lg md:text-xl text-[#F5F5F1] leading-relaxed">{current.angle}</p>
          <dl className="mt-8 space-y-5 text-sm text-[#9aa0a3] leading-relaxed">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8CA5FF] mb-1">Le besoin</dt>
              <dd>{current.need}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8CA5FF] mb-1">Ma contribution</dt>
              <dd>{current.role}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8CA5FF] mb-1">Preuve observable</dt>
              <dd>{current.proof}</dd>
            </div>
          </dl>
          <Link
            href={`/projects/${current.slug}`}
            className="inline-block mt-8 font-mono text-xs uppercase tracking-[0.15em] text-[#8CA5FF] border-b border-[#8CA5FF] pb-0.5"
          >
            Lire l&apos;étude de cas →
          </Link>
        </div>
      </div>

      {/* Accès sans JavaScript : chaque fiche reste joignable par lien HTML */}
      <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-[#9aa0a3]">
        Toutes les fiches :{" "}
        {items.map((p, i) => (
          <span key={p.slug}>
            {i > 0 && " · "}
            <Link href={`/projects/${p.slug}`} className="underline underline-offset-4 hover:text-[#8CA5FF]">
              {p.name}
            </Link>
          </span>
        ))}
      </p>
    </div>
  );
}
