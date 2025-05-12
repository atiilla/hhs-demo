import { OG_IMAGE, SITE } from "@/constants/metadata";
import fs from 'fs';
import path from 'path';

export const alt = SITE.title;
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Using a static icon file instead of dynamic generation
// This avoids the @vercel/og module error
export default async function Icon() {
  // Get the icon file from public directory
  const iconPath = path.join(process.cwd(), 'public', 'assets', 'icon-192x192.png');
  const icon = await fs.promises.readFile(iconPath);
  
  // Return a Response with the icon data
  return new Response(icon, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
