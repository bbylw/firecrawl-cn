/**
 * The site's social cards, 1200 × 630 PNGs rendered at build time: the flame
 * mark over a hairline, then the page's section and title on a dark, fire-lit
 * surface. `og/[...slug].ts` draws one per page and `og.png.ts` the site's own,
 * with its description as the title. This file is the cards' look.
 *
 * `@cloudflare/nimbus-docs/og` does the rest: it loads the fonts, fits text
 * to its lines by measuring it, and renders the PNG. Chinese titles are drawn
 * by the subsetted Noto Sans SC files in `_fonts/` (Satori falls back to them
 * for glyphs Inter lacks). If you add pages with new characters, regenerate
 * the subsets to cover them.
 *
 * The leading underscore keeps Astro from routing this file or `_fonts/`.
 */
import { createCardRenderer, type CardNode, type CardTypography } from "@cloudflare/nimbus-docs/og";
import { root } from "astro:config/server";

import { logo } from "@/components/logo";

// The landing's fire/ink palette (src/styles/globals.css), in hex for Satori.
const FOREGROUND = "#fafaf9";
const MUTED = "#a8a29e";
const FIRE = "#f97316";
const EMBER = "#fbbf24";
const BORDER = "#292524";
const BACKGROUND = "#0c0a09";

const WIDTH = 1200;
const HEIGHT = 630;
const LEFT = 80;
const COLUMN = WIDTH - LEFT - 200;

const TITLE: CardTypography = { fontFamily: "Inter", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1.15, color: FOREGROUND };
const SECTION: CardTypography = { fontFamily: "Inter", fontWeight: 500, lineHeight: 1.2, color: FIRE };

// Fonts sit beside this file, not in public/, so they never ship. Read from
// the project so `astro build --root <site>` finds them.
const font = (file: string) => new URL(`src/pages/og/_fonts/${file}`, root);
const renderer = await createCardRenderer({
  width: WIDTH,
  height: HEIGHT,
  fonts: [
    { name: "Inter", source: font("Inter-Regular.ttf"), weight: 400 },
    { name: "Inter", source: font("Inter-Medium.ttf"), weight: 500 },
    { name: "Noto Sans SC", source: font("NotoSansSC-Regular.ttf"), weight: 400 },
    { name: "Noto Sans SC", source: font("NotoSansSC-Medium.ttf"), weight: 500 },
  ],
  emoji: "strip",
});

type Style = Record<string, string | number>;
const el = (type: string, style: Style, children?: CardNode | (CardNode | undefined)[] | string): CardNode => ({
  type,
  props: { style, children },
});

const Logo = (height: number): CardNode => ({
  type: "svg",
  props: {
    width: Math.round((height * logo.width) / logo.height),
    height,
    viewBox: `0 0 ${logo.width} ${logo.height}`,
    children: logo.paths.map((d) => ({ type: "path", props: { d, fill: FIRE } })),
  },
});

async function card({ section, title, sizes }: { section?: string; title: string; sizes: number[] }): Promise<CardNode> {
  const heading = await renderer.fit(title, { width: COLUMN, sizes, lines: 3, style: TITLE });
  const label = section ? await renderer.fit(section, { width: COLUMN, sizes: [26], lines: 1, style: SECTION }) : undefined;
  return el(
    "div",
    {
      width: WIDTH,
      height: HEIGHT,
      display: "flex",
      position: "relative",
      background: BACKGROUND,
      backgroundImage: `radial-gradient(900px 520px at 100% 0%, rgba(249,115,22,0.22), rgba(12,10,9,0) 60%), radial-gradient(700px 420px at 0% 100%, rgba(234,88,12,0.14), rgba(12,10,9,0) 55%)`,
    },
    [
      // Fire gradient seam along the top edge.
      el("div", { position: "absolute", left: 0, top: 0, width: WIDTH, height: 6, display: "flex", backgroundImage: `linear-gradient(90deg, #ea580c, ${FIRE}, ${EMBER})` }),
      el("div", { position: "absolute", left: LEFT, top: 66, display: "flex", alignItems: "center" }, [
        Logo(36),
        el("div", { display: "flex", marginLeft: 16, fontFamily: "Inter", fontWeight: 500, fontSize: 30, letterSpacing: "-0.02em", color: FOREGROUND }, "Firecrawl"),
        el(
          "div",
          {
            display: "flex",
            marginLeft: 14,
            padding: "3px 12px",
            borderRadius: 999,
            border: "1px solid rgba(249,115,22,0.4)",
            background: "rgba(249,115,22,0.12)",
            fontFamily: "Inter",
            fontWeight: 500,
            fontSize: 20,
            color: FIRE,
          },
          "中文文档",
        ),
      ]),
      el("div", { position: "absolute", left: LEFT, right: LEFT, top: 148, height: 0, borderTop: `1.5px solid ${BORDER}` }),
      // Hung from the hairline rather than set on the bottom margin: X crops
      // the card to 2:1 and covers its foot with the link's domain.
      el("div", { position: "absolute", left: LEFT, top: 204, display: "flex", flexDirection: "column" }, [
        label && el("div", { display: "flex", marginBottom: 18 }, label.node),
        heading.node,
      ]),
      el("div", { position: "absolute", right: LEFT, top: 78, display: "flex", fontFamily: "Inter", fontWeight: 400, fontSize: 22, color: MUTED }, "firecrawl.ndjp.net"),
    ],
  );
}

/** A page's card. */
export const renderPageCard = async (input: { section?: string; title: string }) =>
  renderer.png(await card({ ...input, sizes: [64, 56, 50, 44] }));

/** The site's card: its description, or its title when it has none. */
export const renderSiteCard = async (input: { title: string }) =>
  renderer.png(await card({ ...input, sizes: [72, 64, 56, 50, 44] }));