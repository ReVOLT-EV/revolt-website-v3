export type Sponsor = { name: string; logo: string };
export type Tier = { id: "silver" | "gold" | "diamond"; name: string; summary: string; perks: string[]; sponsors: Sponsor[] };

export const sponsorPackage = {
  pdf: "/sponsor_us_page_media/revolt_sponsorship_package.pdf",
  cover: "/sponsor_us_page_media/rs_frontpage.png",
};

// Ordered entry → top so the page reads as a ladder.
export const tiers: Tier[] = [
  {
    id: "silver",
    name: "Silver",
    summary: "Get your name on the build and in front of UCalgary engineering students.",
    perks: ["Small logo on the bike", "Recognition during Clubs Week", "Basic Career Fair perks"],
    sponsors: [
      { name: "Protocase", logo: "/sponsor_us_page_media/silver/protocase.png" },
      { name: "Onshape", logo: "/sponsor_us_page_media/silver/onshape.png" },
      { name: "Altium", logo: "/sponsor_us_page_media/silver/altium.png" },
    ],
  },
  {
    id: "gold",
    name: "Gold",
    summary: "Stronger engagement with the team and the university community.",
    perks: ["Everything in Silver", "Medium logo showcase", "Enhanced Career Fair presence", "Representatives at a networking event"],
    sponsors: [{ name: "CNOOC", logo: "/sponsor_us_page_media/gold/cnooc.png" }],
  },
  {
    id: "diamond",
    name: "Diamond",
    summary: "Maximum visibility for partners who want to make a major impact.",
    perks: ["Everything in Gold", "Large logo display", "Enterprise-level Career Fair perks", "Free access to all ReVOLT events"],
    sponsors: [
      { name: "UCalgary Schulich School of Engineering", logo: "/sponsor_us_page_media/diamond/uofc_schulich.png" },
      { name: "August Electronics", logo: "/sponsor_us_page_media/diamond/august_electronics.png" },
    ],
  },
];

export const allSponsors = tiers.flatMap((t) => t.sponsors.map((s) => ({ ...s, tier: t.name })));
