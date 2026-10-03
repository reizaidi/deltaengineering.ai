import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Start a project with ${site.name}. Tell us the change you need and we will reply with how we would measure it.`,
  alternates: { canonical: "/contact" },
};

const next = [
  { title: "We read it properly", body: "A senior engineer reviews your inquiry, not an autoresponder." },
  { title: "A short first call", body: "We clarify the workflow, the data and what success looks like." },
  { title: "A written summary", body: "You get our understanding, open questions and a suggested first step." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us the change you need."
        lead="Share as much or as little as you like. We will reply with questions or a suggested first step."
      />
      <section className="mx-auto mt-14 grid max-w-6xl gap-10 px-5 lg:grid-cols-[1.4fr_0.6fr]">
        <ContactForm email={site.email} />
        <aside aria-labelledby="next-h">
          <h2 id="next-h" className="eyebrow">What happens next</h2>
          <ol className="mt-6 space-y-6">
            {next.map((n, i) => (
              <li key={n.title} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white font-display text-xs font-bold text-delta-700 ring-1 ring-delta-600/30">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{n.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">{n.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10 border-t border-line pt-6 text-sm">
            <p className="font-semibold text-ink">Prefer email?</p>
            <a className="mt-1 inline-block text-delta-700 underline underline-offset-4" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>
        </aside>
      </section>
    </>
  );
}
