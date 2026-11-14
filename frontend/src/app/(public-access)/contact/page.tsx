import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/ui";
import { site } from "@/content/site";
import ContactForm from "./ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Get in touch"
        title="Say it loud."
        lead="Questions about the club, joining, sponsorships or anything else? Send us a message and we'll get back to you as soon as we can."
      />

      <section className="gutter pb-[clamp(64px,9vw,120px)]">
        <div className="wrap grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm />

          <aside className="flex flex-col gap-4">
            <div className="card p-7">
              <p className="eyebrow mb-4 !text-muted">Email</p>
              <a href={`mailto:${site.email}`} className="text-lg break-all hover:text-volt">{site.email}</a>
              <p className="mt-6 eyebrow mb-2 !text-muted">Shop</p>
              <p className="text-chalk/75">{site.address}</p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {site.socials.map((s) => (
                  <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm text-chalk/75 hover:text-volt">{s.label} ↗</a>
                ))}
              </div>
            </div>
            <div className="relative min-h-56 flex-1 overflow-hidden rounded-[var(--radius-card)] border border-line">
              <Image src="/contact_page_media/cpm3.JPG" alt="ReVOLT members working in the engineering shop" fill sizes="(min-width:1024px) 480px, 100vw" className="object-cover" />
            </div>
            <p className="px-1 text-sm text-muted">The form is for real inquiries only. Spam and inappropriate messages will be ignored.</p>
          </aside>
        </div>
      </section>
    </main>
  );
}
