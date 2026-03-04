import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { visit } from 'unist-util-visit';
import { SITE } from "./src/config";

function rehypeImageCaptions() {
  return (tree: any) => {
    visit(tree, 'element', (node: any) => {
      if (
        node.tagName === 'p' &&
        node.children?.length === 1 &&
        node.children[0].tagName === 'img' &&
        node.children[0].properties?.title
      ) {
        const img = node.children[0];
        node.tagName = 'figure';
        node.children = [
          img,
          {
            type: 'element',
            tagName: 'figcaption',
            properties: {},
            children: [{ type: 'text', value: img.properties.title }],
          },
        ];
      }
    });
  };
}

// https://astro.build/config

export default defineConfig({
  site: "https://steffnstuff.com",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: 
      [remarkMath,
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    rehypePlugins: [
      rehypeKatex,
      rehypeImageCaptions
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
});
