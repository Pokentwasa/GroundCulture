"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { primaryNav } from "@/data/navigation";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import Wordmark from "@/components/Wordmark";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-all duration-300",
          scrolled
            ? "bg-paper/90 py-3 backdrop-blur-sm [border-bottom:1px_solid_var(--gc-line)]"
            : "bg-transparent py-5",
        )}
      >
        <div className="u-container flex items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="Ground Culture home"
            data-cursor="Home"
            className="shrink-0"
          >
            <Wordmark
              playful
              className={cn(
                "transition-all duration-300",
                scrolled ? "text-lg" : "text-xl md:text-2xl",
              )}
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {primaryNav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="link-wipe text-[0.8rem] font-semibold uppercase tracking-[0.12em]"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={site.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Come through"
              className="hidden items-center gap-2 bg-ink px-5 py-3 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-paper transition-colors hover:bg-chilli sm:inline-flex"
            >
              Come Through <span aria-hidden>&#8599;</span>
            </a>

            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 lg:hidden"
              aria-label="Open menu"
            >
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.14em]">
                Menu
              </span>
              <span className="flex flex-col gap-[5px]">
                <span className="block h-[2px] w-6 bg-ink" />
                <span className="block h-[2px] w-6 bg-ink" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet full-screen takeover */}
      <div
        className={cn(
          "fixed inset-0 z-[110] flex flex-col bg-ink text-paper transition-transform duration-500 ease-cultural lg:hidden",
          open ? "translate-y-0" : "-translate-y-full",
        )}
        aria-hidden={!open}
      >
        <div className="u-container flex items-center justify-between py-5">
          <Wordmark className="text-xl" tone="paper" />
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="text-[0.72rem] font-bold uppercase tracking-[0.14em]"
          >
            Close &#215;
          </button>
        </div>

        <nav className="u-container flex flex-1 flex-col justify-center gap-1">
          {primaryNav.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-4 border-b border-paper/10 py-2"
            >
              <span className="meta text-xs text-chilli">
                0{i + 1}
              </span>
              <span className="display d-md text-paper transition-colors group-hover:text-green-2">
                {l.mobileLabel ?? l.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="u-container flex flex-col gap-4 py-8">
          <div className="flex items-center gap-2">
            <span className="block h-2 w-2 animate-pulse rounded-full bg-chilli" />
            <span className="meta text-xs uppercase tracking-[0.16em] text-paper/70">
              Currently in Cape Town
            </span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[0.8rem] font-semibold uppercase tracking-[0.1em]">
            <a href={site.contact.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a href={site.social.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={site.directionsUrl} target="_blank" rel="noreferrer">
              Directions
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
