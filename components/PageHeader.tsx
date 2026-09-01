interface PageHeaderProps {
  index?: string;
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
}

// Consistent interior-page opening. Sits below the fixed nav.
export default function PageHeader({
  index,
  eyebrow,
  title,
  lead,
}: PageHeaderProps) {
  return (
    <header className="u-container pt-32 md:pt-40">
      {(index || eyebrow) && (
        <span className="section-index text-ink/60">
          {index ? `${index} / ` : ""}
          <span className="text-chilli">{eyebrow}</span>
        </span>
      )}
      <h1 className="display d-xl mt-3 max-w-5xl text-ink">{title}</h1>
      {lead && (
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/75">
          {lead}
        </p>
      )}
    </header>
  );
}
