"use client";

import { useState } from "react";

type Props = {
  vcardString: string;
  fileName?: string;
};

export function SaveContactButton({
  vcardString,
  fileName = "mouhamadou-diouf.vcf",
}: Props) {
  const [saved, setSaved] = useState(false);

  function handleSave() {
    const blob = new Blob([vcardString], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <button
      type="button"
      onClick={handleSave}
      className="group inline-flex items-center gap-3 text-base font-medium border-b border-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors pb-1"
    >
      <span className="font-mono text-xs text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
        {saved ? "✓" : "↓"}
      </span>
      <span>
        {saved ? "Contact enregistré" : "Enregistrer le contact"}
      </span>
    </button>
  );
}
