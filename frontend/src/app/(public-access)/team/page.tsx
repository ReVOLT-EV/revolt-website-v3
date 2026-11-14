import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/ui";
import { groupPhoto, subTeams } from "@/content/team";
import TeamTabs from "./TeamTabs";

export const metadata: Metadata = { title: "Team" };

const total = subTeams.reduce((n, t) => n + t.members.length, 0);

export default function TeamPage() {
  return (
    <main>
      <PageHero
        eyebrow="The pit crew"
        title="Meet the team"
        lead={`${total} students across four sub-teams. Engineers, designers and business students who learn by building.`}
        image={groupPhoto}
      />

      <section className="gutter border-t border-line py-[clamp(48px,6vw,80px)]">
        <div className="wrap">
          <TeamTabs teams={subTeams} />
        </div>
      </section>

      <section className="gutter bg-volt py-[clamp(56px,8vw,96px)] text-asphalt">
        <div className="wrap flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="eyebrow mb-4 !text-asphalt">Join the crew</p>
            <h2 className="h-display text-[clamp(26px,3.6vw,44px)]">Every faculty welcome.</h2>
            <p className="mt-4 max-w-xl text-asphalt/75">Nobody arrives knowing how to build a battery pack. Reach out and we&apos;ll tell you when recruitment opens.</p>
          </div>
          <Link href="/contact" className="btn btn-dark">Get in touch</Link>
        </div>
      </section>
    </main>
  );
}
