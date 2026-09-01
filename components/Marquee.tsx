const words = [
  "Comedy",
  "Coffee",
  "Burgers",
  "Live Music",
  "Quiz Nights",
  "People",
  "Cape Town",
];

// The one and only marquee. A strip between the hero and the programme.
export default function Marquee() {
  const line = [...words, ...words];
  return (
    <div className="overflow-hidden border-y border-ink bg-ink py-3 text-paper">
      <div className="marquee-track">
        {[0, 1].map((dup) => (
          <span key={dup} className="flex items-center" aria-hidden={dup === 1}>
            {line.map((w, i) => (
              <span key={`${dup}-${i}`} className="flex items-center">
                <span className="display px-6 text-2xl md:text-3xl">{w}</span>
                <span className="text-chilli">&#9679;</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
