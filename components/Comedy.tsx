import ArrowLink from "@/components/ArrowLink";

export default function Comedy() {
  return (
    <section className="relative overflow-hidden bg-paper py-20 md:py-32">
      <div className="u-container relative z-10 flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h2 className="display d-mega text-ink">
          Cape Town
          <br />
          comes here
          <br />
          to laugh.
        </h2>
        <p className="mt-6 max-w-sm text-sm text-ink/70">
          Weekly comedy nights, open mics and touring headliners. South
          Africa&#39;s fastest-growing comedy club.
        </p>
        <div className="mt-8">
          <ArrowLink href="/events" variant="block" tone="chilli" cursor="Tickets">
            See Comedy Shows
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
