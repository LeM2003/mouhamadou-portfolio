import { ImageResponse } from "next/og";
import { IconMark } from "@/components/IconMark";

// 192 px = multiple de 48 : taille que Google exige pour afficher un favicon
// dans ses résultats. Les navigateurs la réduisent pour l'onglet.
export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<IconMark size={size.width} radius={40} />, { ...size });
}
