import { ImageResponse } from "next/og";
import { IconMark } from "@/components/IconMark";

// iOS applique son propre arrondi : on fournit un carré plein (radius 0).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(<IconMark size={size.width} radius={0} />, { ...size });
}
