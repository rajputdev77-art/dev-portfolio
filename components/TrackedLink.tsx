"use client";
import Link from "next/link";
import { track } from "@/lib/track";

interface Props {
  href: string;
  className?: string;
  event: string;
  props?: Record<string, string | number | boolean | null>;
  external?: boolean;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

/**
 * Tiny wrapper around next/link (or <a> for external) that fires a track() call
 * on click before navigation. Used inside server components.
 */
export default function TrackedLink({
  href,
  className,
  event,
  props,
  external,
  target,
  rel,
  children,
}: Props) {
  if (external) {
    return (
      <a
        href={href}
        className={className}
        target={target || "_blank"}
        rel={rel || "noreferrer"}
        onClick={() => track(event, props)}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={() => track(event, props)}>
      {children}
    </Link>
  );
}
