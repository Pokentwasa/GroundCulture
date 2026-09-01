import ArrowLink from "@/components/ArrowLink";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <span className="meta text-[0.7rem] uppercase tracking-[0.18em] text-chilli">
        404
      </span>
      <h1 className="display d-xl mt-4 text-ink">
        Nothing
        <br />
        here. Yet.
      </h1>
      <p className="mt-5 max-w-sm text-sm text-ink/70">
        That page has left the building. The good stuff is still on.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ArrowLink href="/" variant="block" tone="ink">
          Back Home
        </ArrowLink>
        <ArrowLink href="/events" variant="block" tone="chilli">
          What&#39;s On
        </ArrowLink>
      </div>
    </section>
  );
}
