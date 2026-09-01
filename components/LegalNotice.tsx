import PageHeader from "@/components/PageHeader";
import { site } from "@/lib/site";

// Placeholder shell for legal pages. Deliberately does NOT invent policy
// copy: paste Ground Culture's real, reviewed policy text into `body`.
export default function LegalNotice({
  title,
  body,
}: {
  title: string;
  body?: React.ReactNode;
}) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={title} />
      <div className="u-container prose-sm mt-8 max-w-2xl pb-24 text-ink/80">
        {body ?? (
          <p className="text-sm leading-relaxed">
            The full {title.toLowerCase()} is being brought across from the
            current Ground Culture site. In the meantime, reach us at{" "}
            <a href={site.contact.emailHref} className="link-wipe font-semibold">
              {site.contact.email}
            </a>{" "}
            or {site.contact.phone}.
          </p>
        )}
        <p className="meta mt-8 text-[0.6rem] uppercase tracking-[0.14em] text-chilli">
          Placeholder &#183; replace with reviewed policy copy
        </p>
      </div>
    </>
  );
}
