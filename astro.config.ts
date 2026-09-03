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
import mdx from "@astrojs/mdx";
import { SITE } from "./src/config";

// :::aside ... ::: fenced blocks, rendered as a centered <aside> box.
function remarkAsides() {
  const OPEN = /^:::aside[ \t]*/;

  // Text of a paragraph's first child, used to spot the fence markers.
  const leadText = (node: any) =>
    node?.type === 'paragraph' && node.children?.[0]?.type === 'text'
      ? node.children[0].value
      : null;

  // If the last text descendant of `node` ends with a ::: fence, strip it and
  // report success. Markdown absorbs the closing fence into whatever block
  // precedes it when there is no blank line, including nested list items.
  const trimTrailingFence = (node: any): boolean => {
    if (node?.type === 'text') {
      if (!/\n:::[ \t]*$/.test(node.value)) return false;
      node.value = node.value.replace(/\n:::[ \t]*$/, '');
      return true;
    }
    const kids = node?.children;
    if (!kids?.length) return false;
    return trimTrailingFence(kids[kids.length - 1]);
  };

  const asideNode = (children: any[]) => ({
    type: 'aside',
    data: {
      hName: 'aside',
      hProperties: { className: ['aside'] },
    },
    children,
  });

  return (tree: any) => {
    const children = tree.children;
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      const text = leadText(node);
      const open = text?.match(OPEN);
      if (!open) continue;

      // Strip the opening marker from the paragraph's leading text.
      node.children[0].value = text.slice(open[0].length).replace(/^\n/, '');

      // Case 1: no blank lines, so the whole aside is this one paragraph and
      // the closing ::: is trailing text on its last child.
      if (trimTrailingFence(node)) {
        children[i] = asideNode([node]);
        continue;
      }

      // Case 2: blank lines, so the fences are separate blocks. The closing
      // ::: is either its own paragraph or trailing text on the last block
      // (e.g. absorbed into the final item of a list).
      let close = -1;
      for (let j = i + 1; j < children.length; j++) {
        if (leadText(children[j])?.trimEnd() === ':::') {
          close = j;
          break;
        }
        if (trimTrailingFence(children[j])) {
          close = j + 1; // fence consumed in place; include this block
          break;
        }
      }
      // No closing fence: restore the marker and leave the text alone.
      if (close === -1) {
        node.children[0].value = text;
        continue;
      }

      const inner = children.slice(i + 1, close);
      // Keep any content that followed the marker on the opening line.
      if (node.children.length > 1 || node.children[0].value !== '') {
        inner.unshift(node);
      }
      children.splice(i, close - i + 1, asideNode(inner));
    }
  };
}

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
    mdx()
  ],
  markdown: {
    remarkPlugins:
      [remarkMath,
      remarkAsides,
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
