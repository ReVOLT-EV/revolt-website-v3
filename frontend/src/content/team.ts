export type Member = { name: string; role: string; img: string };
export type SubTeam = { id: string; name: string; blurb: string; photo: string; members: Member[] };

export const groupPhoto = "/team_page_media/team1.JPG";

// Roster source of truth: the "Motorbike Team" shared Drive folder (2026).
// Only people with a photo in that folder are listed.
export const subTeams: SubTeam[] = [
  {
    id: "mechanical",
    name: "Mechanical",
    blurb: "Frame, mounts, battery box and everything that holds the build together.",
    photo: "/team_page_media/mech_team/MECH.JPG",
    members: [
      { name: "Aldrich James Varghese", role: "Structural Lead", img: "/team_page_media/2026/aldrich-james-varghese.jpg" },
      { name: "Justin Abarquez", role: "Mechanical Member", img: "/team_page_media/2026/justin-abarquez.jpg" },
      { name: "Kevin Panajoti", role: "Mechanical Member", img: "/team_page_media/2026/kevin-panajoti.jpg" },
      { name: "Logan Kim", role: "Mechanical Member", img: "/team_page_media/2026/logan-kim.jpg" },
      { name: "Alex Lee", role: "Mechanical Member", img: "/team_page_media/2026/alex-lee.jpg" },
      { name: "Noah Li", role: "Mechanical Member", img: "/team_page_media/2026/noah-li.jpg" },
    ],
  },
  {
    id: "electrical",
    name: "Electrical",
    blurb: "Battery pack, motor controller, wiring harness and the high-voltage safety systems.",
    photo: "/team_page_media/elec_team/ELEC.JPG",
    members: [
      { name: "Marc Durieu", role: "Electrical Lead", img: "/team_page_media/2026/marc-durieu.jpg" },
      { name: "Tugssaruul Lkhagvadorj", role: "Electrical Sub-Lead", img: "/team_page_media/2026/tugssaruul-lkhagvadorj.jpg" },
    ],
  },
  {
    id: "software",
    name: "Software",
    blurb: "Telemetry, dashboards, firmware and this website.",
    photo: "/team_page_media/soft_team/SOFT.JPG",
    members: [
      { name: "Rumeza Fatima", role: "Software Lead", img: "/team_page_media/2026/rumeza-fatima.jpg" },
    ],
  },
  {
    id: "business",
    name: "Business",
    blurb: "Sponsorships, finance, events and keeping the shop funded.",
    photo: "/team_page_media/biz_team/BIZ.JPG",
    members: [
      { name: "Tirta Kusjanto", role: "President", img: "/team_page_media/2026/tirta-kusjanto.jpg" },
      { name: "Janelle Ruiz", role: "Content Creation Manager", img: "/team_page_media/2026/janelle-ruiz.jpg" },
      { name: "Manal Fatima", role: "Sponsorships & Outreach Manager", img: "/team_page_media/2026/manal-fatima.jpg" },
      { name: "Roy Yang", role: "Finance Manager", img: "/team_page_media/2026/roy-yang.jpg" },
      { name: "Oliver Henderson", role: "Treasurer", img: "/team_page_media/2026/oliver-henderson.jpg" },
    ],
  },
];
