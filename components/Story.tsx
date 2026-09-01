import { site } from "@/lib/site";
import ArrowLink from "@/components/ArrowLink";
import Media from "@/components/Media";

const WIX = "https://static.wixstatic.com/media";
const portrait = `${WIX}/207811_8a53a425fe4c480b8f36bba46b813169~mv2.jpg/v1/fill/w_800,h_1200,al_c,q_85,enc_avif,quality_auto/207811_8a53a425fe4c480b8f36bba46b813169~mv2.jpg`;

// Real origin content, restructured editorially rather than dumped from the
// About page.
export default function Story() {
  return (
    <section className="bg-paper py-16 md:py-28">
      <div className="u-container">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="display d-xl text-ink">
              How we
              <br />
              got here.
            </h2>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <p className="text-sm leading-relaxed text-ink/80">
                The vision was simple: unite and empower South Africans through
                platforms that celebrate creativity, community and
                entrepreneurship. Start with a room in Observatory. Fill it with
                people.
              </p>
              <p className="text-sm leading-relaxed text-ink/80">
                By day it&#39;s a coffee shop. By night it became South
                Africa&#39;s fastest-growing comedy club, hosting the likes of
                Riaad Moosa, Nina Hastie and Rob Van Vuuren. The food-truck side
                champions chefs, turning culinary passion into thriving,
                owner-run enterprises.
              </p>
            </div>

            <blockquote className="mt-10 border-l-2 border-chilli pl-6">
              <p className="display text-3xl leading-[0.95] text-ink md:text-5xl">
                &#8220;A grounded culture of growth, connection and
                empowerment.&#8221;
              </p>
            </blockquote>

            <div className="mt-8">
              <ArrowLink href="/about" variant="block" tone="ink">
                Read the Full Story
              </ArrowLink>
            </div>
          </div>

          <div className="lg:col-span-5">
            <figure className="relative">
              <div className="poster relative aspect-[3/4] w-full overflow-hidden [box-shadow:8px_8px_0_0_var(--gc-green)]">
                <Media
                  src={portrait}
                  alt="Ground Culture Observatory"
                  slot="story-observatory"
                />
              </div>
              <figcaption className="meta mt-3 flex items-center justify-between text-[0.62rem] uppercase tracking-[0.14em] text-ink/60">
                <span>{site.hq.address}</span>
                <span className="text-chilli">EST. Observatory</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
