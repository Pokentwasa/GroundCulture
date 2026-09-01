import PageHeader from "@/components/PageHeader";
import Media from "@/components/Media";
import { site } from "@/lib/site";

interface HireDetailProps {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  perfectFor: string[];
  how: { t: string; d: string }[];
  enquirySubject: string;
  image?: string;
  imageSlot: string;
}

// Shared layout for both hire journeys. No form backend is assumed: the
// enquiry path is WhatsApp (pre-filled) + email, which is how Ground Culture
// actually takes bookings today.
export default function HireDetail({
  index,
  eyebrow,
  title,
  lead,
  perfectFor,
  how,
  enquirySubject,
  image,
  imageSlot,
}: HireDetailProps) {
  const wa = `${site.contact.whatsapp}?text=${encodeURIComponent(
    `Hi Ground Culture, I'd like to enquire about ${enquirySubject}.`,
  )}`;
  const mail = `${site.contact.emailHref}?subject=${encodeURIComponent(
    `${enquirySubject} enquiry`,
  )}`;

  return (
    <>
      <PageHeader index={index} eyebrow={eyebrow} title={title} lead={lead} />

      <div className="u-container mt-12 grid gap-10 pb-24 lg:grid-cols-[1fr_1fr]">
        <div>
          <div className="poster relative aspect-[4/3] w-full overflow-hidden [box-shadow:8px_8px_0_0_var(--gc-ink)]">
            <Media src={image} alt={eyebrow} slot={imageSlot} eager />
          </div>

          <h2 className="display mt-10 text-3xl text-ink">Perfect for</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {perfectFor.map((p) => (
              <li
                key={p}
                className="border border-ink/20 px-3 py-1.5 text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-ink/70"
              >
                {p}
              </li>
            ))}
          </ul>

          <h2 className="display mt-10 text-3xl text-ink">How it works</h2>
          <ol className="mt-4 divide-y divide-ink/10 border-y border-ink/15">
            {how.map((h, i) => (
              <li key={h.t} className="flex gap-5 py-4">
                <span className="display text-2xl text-chilli">0{i + 1}</span>
                <div>
                  <p className="font-semibold">{h.t}</p>
                  <p className="text-sm text-ink/70">{h.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Enquiry */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="bg-ink p-8 text-paper">
            <h2 className="display d-md">
              Let&#39;s
              <br />
              make it happen.
            </h2>
            <p className="mt-4 text-sm text-paper/75">
              Tell us the date, the headcount and the vibe. We&#39;ll come back
              with everything you need.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-chilli px-6 py-4 text-sm font-bold uppercase tracking-[0.1em] text-paper transition-colors hover:brightness-110"
              >
                Enquire on WhatsApp <span aria-hidden>&#8599;</span>
              </a>
              <a
                href={mail}
                className="inline-flex items-center justify-center gap-2 border border-paper/40 px-6 py-4 text-sm font-bold uppercase tracking-[0.1em] transition-colors hover:bg-paper hover:text-ink"
              >
                Email Us
              </a>
              <a
                href={site.contact.phoneHref}
                className="inline-flex items-center justify-center gap-2 border border-paper/40 px-6 py-4 text-sm font-bold uppercase tracking-[0.1em] transition-colors hover:bg-paper hover:text-ink"
              >
                {site.contact.phone}
              </a>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
