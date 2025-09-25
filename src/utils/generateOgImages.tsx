import satori, { type SatoriOptions } from "satori";
import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";
import { readFile } from "fs/promises";
import path from "path";

const fetchFonts = async () => {
  // Regular Font
  const fontFileRegular = await fetch(
    "https://www.1001fonts.com/download/font/ibm-plex-mono.regular.ttf"
  );
  const fontRegular: ArrayBuffer = await fontFileRegular.arrayBuffer();

  // Bold Font
  const fontFileBold = await fetch(
    "https://www.1001fonts.com/download/font/ibm-plex-mono.bold.ttf"
  );
  const fontBold: ArrayBuffer = await fontFileBold.arrayBuffer();

  return { fontRegular, fontBold };
};

const { fontRegular, fontBold } = await fetchFonts();

// Load logo from public folder and convert to data URL for satori to render
let logoDataUrl: string | undefined;
try {
  const logoPath = path.join(process.cwd(), "public", "peachfuzzz_peeking_nobg.png");
  const logoBuffer = await readFile(logoPath);
  // logoBuffer may be a Uint8Array; toString('base64') works on Buffer
  const base64 = Buffer.isBuffer(logoBuffer)
    ? logoBuffer.toString("base64")
    : Buffer.from(logoBuffer).toString("base64");
  logoDataUrl = `data:image/png;base64,${base64}`;
} catch (err) {
  // If reading fails, we simply won't render the logo in the generated image
  logoDataUrl = undefined;
}
console.log("generateOgImages: logoDataUrl set?", !!logoDataUrl);

const options: SatoriOptions = {
  width: 1200,
  height: 630,
  embedFont: true,
  fonts: [
    {
      name: "IBM Plex Mono",
      data: fontRegular,
      weight: 400,
      style: "normal",
    },
    {
      name: "IBM Plex Mono",
      data: fontBold,
      weight: 600,
      style: "normal",
    },
  ],
};

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function generateOgImageForPost(post: CollectionEntry<"blog">) {
  const svg = await satori(postOgImage(post, logoDataUrl), options);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await satori(siteOgImage(logoDataUrl), options);
  return svgBufferToPngBuffer(svg);
}
