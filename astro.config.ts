import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { visit, SKIP } from 'unist-util-visit';
import { SITE } from "./src/config";

function rehypeAnnotations() {
  return (tree: any) => {
    let counter = 0;
    visit(tree, 'element', (node: any, index: any, parent: any) => {
      if (node.tagName !== 'ann' || index === null || !parent) return;
      counter++;
      const num = String(counter);
      parent.children[index] = {
        type: 'element',
        tagName: 'span',
        properties: { className: ['annotation'] },
        children: [
          {
            type: 'element',
            tagName: 'button',
            properties: {
              className: ['annotation-ref'],
              dataAnnotation: num,
              ariaLabel: `Annotation ${num}`,
              type: 'button',
            },
            children: [{ type: 'text', value: num }],
          },
          {
            type: 'element',
            tagName: 'span',
            properties: {
              className: ['annotation-content'],
              id: `ann-${num}`,
              role: 'tooltip',
            },
            children: node.children,
          },
        ],
      };
      return SKIP;
    });
  };
}

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
      rehypeRaw,
      rehypeAnnotations,
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
