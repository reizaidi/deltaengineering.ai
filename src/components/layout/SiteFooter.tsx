import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { nav, services, site } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-32 px-3 pb-6 sm:px-5">
      <div className="glass mx-auto max-w-6xl px-6 py-12 sm:px-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-2">{site.description}</p>
          </div>
          <FooterCol title="Company" links={[...nav, { href: "/contact", label: "Contact" }]} />
          <FooterCol
            title="Services"
            links={services.slice(0, 4).map((s) => ({ href: `/services#${s.slug}`, label: s.title }))}
          />
          <div>
            <h2 className="eyebrow">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a className="text-ink-2 underline-offset-4 hover:text-ink hover:underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </li>
              <li className="text-ink-2">{site.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.7rem] font-medium tracking-[0.3em] text-muted">
          {site.pillars.map((p, i) => (
            <span key={p} className="flex items-center gap-5">
              {i > 0 && <span aria-hidden className="h-3 w-px bg-gold-500" />}
              {p.toUpperCase()}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {site.tagline}.
          </p>
          <Link href="/privacy" className="underline-offset-4 hover:text-ink hover:underline">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: ReadonlyArray<{ href: string; label: string }> }) {
  return (
    <div>
      <h2 className="eyebrow">{title}</h2>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link className="text-ink-2 underline-offset-4 hover:text-ink hover:underline" href={l.href}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
