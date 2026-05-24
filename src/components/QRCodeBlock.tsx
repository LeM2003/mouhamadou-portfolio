"use client";

import { QRCodeSVG } from "qrcode.react";

type Props = {
  value: string;
  size?: number;
};

export function QRCodeBlock({ value, size = 180 }: Props) {
  return (
    <div className="inline-flex flex-col items-center gap-3 p-5 bg-[var(--background)] border border-[var(--hairline)]">
      <QRCodeSVG
        value={value}
        size={size}
        bgColor="transparent"
        fgColor="var(--foreground)"
        level="M"
        marginSize={0}
      />
      <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]">
        Scan to save
      </div>
    </div>
  );
}
