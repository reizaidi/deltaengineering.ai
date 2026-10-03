import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-5 pt-28 text-center">
      <p className="font-display text-7xl font-extrabold text-ink">
        4<span className="text-delta-600">Δ</span>4
      </p>
      <h1 className="mt-6 font-display text-2xl font-bold text-ink">This page does not exist.</h1>
      <p className="mt-3 text-ink-2">The link may be out of date. The pages below are a good place to continue.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" arrow>Home</ButtonLink>
        <ButtonLink href="/services" variant="glass">Services</ButtonLink>
      </div>
    </section>
  );
}
