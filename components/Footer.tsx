import Link from "next/link";
import { site } from "@/lib/site";
import { footerNav } from "@/data/navigation";

export default function Footer() {
  return (
    <footer className="relative bg-ink pt-16 text-paper">
      <div className="u-container">
        {/* Contact + nav */}
        <div className="grid gap-10 border-b border-paper/15 pb-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <span className="meta text-[0.68rem] uppercase tracking-[0.18em] text-chilli">
              Stay in touch
            </span>
            <a
              href={site.contact.phoneHref}
              className="mt-4 block text-2xl font-semibold"
            >
              {site.contact.phone}
            </a>
            <a
              href={site.contact.emailHref}
              className="link-wipe mt-1 block text-lg"
            >
              {site.contact.email}
            </a>
            <p className="mt-4 max-w-xs text-sm text-paper/70">
              {site.hq.address}
              <br />
              {site.hq.city}, {site.hq.country}
            </p>
          </div>

          <nav className="flex flex-col gap-2">
            {footerNav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="link-wipe w-fit text-sm font-semibold uppercase tracking-[0.08em] text-paper/85"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="link-wipe w-fit text-sm font-semibold uppercase tracking-[0.08em] text-paper/85"
            >
              Instagram {site.social.instagramHandle}
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noreferrer"
              className="link-wipe w-fit text-sm font-semibold uppercase tracking-[0.08em] text-paper/85"
            >
              Facebook
            </a>
            <a
              href={site.social.tiktok}
              target="_blank"
              rel="noreferrer"
              className="link-wipe w-fit text-sm font-semibold uppercase tracking-[0.08em] text-paper/85"
            >
              TikTok
            </a>
            <a
              href={site.contact.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="link-wipe w-fit text-sm font-semibold uppercase tracking-[0.08em] text-paper/85"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div className="py-10">
          <div className="display leading-[0.82] text-paper">
            <span className="block text-[22vw] lg:text-[19vw]">Ground</span>
            <span className="block text-[22vw] text-green-2 lg:text-[19vw]">
              Culture
              <sup className="ml-2 align-super text-[0.2em] text-paper/60">
                &#8482;
              </sup>
            </span>
          </div>
        </div>

        {/* Base line */}
        <div className="flex flex-col gap-4 border-t border-paper/15 py-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-5 gap-y-1 meta text-[0.62rem] uppercase tracking-[0.14em] text-paper/50">
            <Link href={site.legal.privacy}>Privacy</Link>
            <Link href={site.legal.terms}>Terms</Link>
            <Link href={site.legal.refund}>Refund</Link>
            <Link href={site.legal.accessibility}>Accessibility</Link>
          </div>
          <div className="flex items-center gap-4 meta text-[0.62rem] uppercase tracking-[0.14em] text-paper/50">
            <span>&#169; {new Date().getFullYear()} Ground Culture</span>
            <span className="text-chilli">Built for the culture.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
