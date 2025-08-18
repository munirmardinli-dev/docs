import 'katex/dist/katex.min.css'
import React, { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import { highlight } from "sugar-high";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

const components = {
  h1: (props: HeadingProps) => <h1 {...props} />,
  h2: (props: HeadingProps) => <h2 {...props} />,
  h3: (props: HeadingProps) => <h3 {...props} />,
  h4: (props: HeadingProps) => <h4 {...props} />,
  p: (props: ParagraphProps) => <p {...props} />,
  ol: (props: ListProps) => <ol {...props} />,
  ul: (props: ListProps) => <ul {...props} />,
  li: (props: ListItemProps) => <li {...props} />,
  em: (props: ComponentPropsWithoutRef<"em">) => <em {...props} />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => <strong {...props} />,
  a: ({ href, children, ...props }: AnchorProps) => {
    if (href?.startsWith("/")) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith("#")) {
      return (
        <a href={href} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => {
    const codeHTML = highlight(children as string);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  },
  blockquote: (props: BlockquoteProps) => <blockquote {...props} />,
  img: (props: ImageProps) => <Image unoptimized priority {...props} />,
} satisfies MDXComponents;

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents & MDXComponents {
  return components;
}
