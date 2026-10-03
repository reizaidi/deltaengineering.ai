import { ButtonLink } from "@/components/ui/Button";

export function CtaBand() {
  return (
    <section aria-labelledby="cta-h" className="mx-auto mt-32 max-w-shell px-5">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-delta-700 px-6 py-14 text-white sm:px-14 sm:py-16">
        <svg aria-hidden viewBox="0 0 400 352" className="absolute -right-16 -top-10 w-[26rem] opacity-[0.22]">
          <path d="M200 10 L390 340 L10 340 Z" fill="none" stroke="#c5a467" strokeWidth="1.5" />
          <path d="M200 90 L320 300 L80 300 Z" fill="none" stroke="#c5a467" strokeWidth="1.5" />
          <path d="M200 170 L250 260 L150 260 Z" fill="#c5a467" fillOpacity="0.6" />
        </svg>
        <div className="relative max-w-2xl">
          <h2 id="cta-h" className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Tell us the change you need. We will tell you how we would measure it.
          </h2>
          <p className="mt-4 text-lg text-[#d9d2ef]">A short first conversation, a written summary afterwards, no obligation.</p>
          <div className="mt-8">
            <ButtonLink href="/contact" arrow variant="gold">
              Start a project
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
