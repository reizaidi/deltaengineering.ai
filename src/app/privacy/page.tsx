import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${site.name} handles information sent through this website.`,
  alternates: { canonical: "/privacy" },
};

// Plain-language notice. Have it reviewed against the laws that apply to you
// (for example Pakistan's data protection rules, GDPR for EU visitors) before launch.
export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy" title="Privacy notice" lead="Short version: we only use what you send us to reply to you." />
      <div className="mx-auto mt-12 max-w-3xl space-y-8 px-5 leading-relaxed text-ink-2 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink">
        <section>
          <h2>What we collect</h2>
          <p className="mt-2">
            When you send an inquiry we receive your name, email address, optional company name, the type of help you
            selected and your message. Our hosting provider keeps standard server logs (such as IP address and time of
            request) for security.
          </p>
        </section>
        <section>
          <h2>How we use it</h2>
          <p className="mt-2">
            Only to reply to your inquiry and to discuss a potential engagement. We do not sell it, add you to mailing
            lists, or use it to train AI models.
          </p>
        </section>
        <section>
          <h2>Cookies and analytics</h2>
          <p className="mt-2">This site does not set advertising or tracking cookies.</p>
        </section>
        <section>
          <h2>Your choices</h2>
          <p className="mt-2">
            Email{" "}
            <a className="text-delta-700 underline underline-offset-4" href={`mailto:${site.email}`}>
              {site.email}
            </a>{" "}
            to ask what we hold about you or to have it deleted.
          </p>
        </section>
      </div>
    </>
  );
}
