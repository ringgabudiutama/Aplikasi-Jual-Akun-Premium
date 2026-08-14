import sharp from "sharp";
import { mkdirSync } from "fs";

mkdirSync("public", { recursive: true });

// Brand mark: a rounded square with an "orbit" ring + center dot in the
// primary indigo, echoing the constellation motif used in the hero section.
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4B3AF0"/>
      <stop offset="100%" stop-color="#2F1FB8"/>
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="24" fill="url(#g)"/>
  <circle cx="50" cy="50" r="26" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-dasharray="6 7" opacity="0.85"/>
  <circle cx="50" cy="50" r="9" fill="#FFFFFF"/>
  <circle cx="79" cy="35" r="6" fill="#FF6B4A"/>
  <circle cx="24" cy="70" r="5" fill="#16C79A"/>
  <circle cx="74" cy="74" r="4" fill="#FFB238"/>
</svg>`;

const targets = [
  ["public/icon-192.png", 192],
  ["public/icon-512.png", 512],
  ["public/apple-touch-icon.png", 180],
];

for (const [file, size] of targets) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(file);
  console.log("wrote", file);
}
