import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Carte d'aperçu (LinkedIn, WhatsApp, X…) quand on partage le lien du site.
// Couleurs = tokens du site : papier #F5F5F1, encre #111, accent cobalt #2146E8.
export const alt = "Mouhamadou Diouf — AI Product Builder · Produits web, data & IA · Dakar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "public/mouhamadou-diouf.jpg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "#F5F5F1",
          padding: 72,
          gap: 64,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={420} height={420} style={{ borderRadius: 24 }} alt="" />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", width: 72, height: 8, background: "#2146E8", marginBottom: 32 }} />
          <div style={{ fontSize: 64, fontWeight: 700, color: "#111111", lineHeight: 1.05 }}>
            Mouhamadou Diouf
          </div>
          <div style={{ fontSize: 34, color: "#333333", marginTop: 24, lineHeight: 1.3 }}>
            AI Product Builder — produits web, data & IA
          </div>
          <div style={{ fontSize: 28, color: "#2146E8", marginTop: 32 }}>
            Dakar · Créateur de Liggeyo
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
