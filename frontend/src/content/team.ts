export type Member = { name: string; role: string; img: string };
export type SubTeam = { id: string; name: string; blurb: string; photo: string; members: Member[] };

export const groupPhoto = "/team_page_media/team1.JPG";

export const subTeams: SubTeam[] = [
  {
    id: "mechanical",
    name: "Mechanical",
    blurb: "Frame, mounts, battery box and everything that holds the build together.",
    photo: "/team_page_media/mech_team/MECH.JPG",
    members: [
      { name: "Qasim Chaudhary", role: "Mechanical Lead", img: "/team_page_media/mech_team/Qasim Chaudhary.JPG" },
      { name: "Nimuthu Thanthriwatte", role: "Mechanical Lead", img: "/team_page_media/mech_team/Nimuthu Hemachandra.JPG" },
      { name: "Kassem Jarrah", role: "Battery Box Lead", img: "/team_page_media/mech_team/Kassem Jarrah.JPG" },
      { name: "Aldrich James Varghese", role: "Structural Lead", img: "/team_page_media/2026/aldrich-james-varghese.jpg" },
      { name: "Justin Abarquez", role: "Mechanical Member", img: "/team_page_media/2026/justin-abarquez.jpg" },
      { name: "Amir El-Kassamani", role: "Mechanical Member", img: "/team_page_media/mech_team/Amir El Kassamani.JPG" },
      { name: "Asim Salman", role: "Mechanical Member", img: "/team_page_media/mech_team/Asim Salman.JPG" },
      { name: "Kevin Panajoti", role: "Mechanical Member", img: "/team_page_media/2026/kevin-panajoti.jpg" },
      { name: "Logan Kim", role: "Mechanical Member", img: "/team_page_media/2026/logan-kim.jpg" },
      { name: "Alex Lee", role: "Mechanical Member", img: "/team_page_media/2026/alex-lee.jpg" },
      { name: "Mihira Patel", role: "Mechanical Member", img: "/team_page_media/mech_team/Mihira Patel.JPG" },
      { name: "Emma Mantilla", role: "Mechanical Member", img: "/team_page_media/mech_team/Emma Mantilla.JPG" },
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
      { name: "Damon Cameron", role: "Electrical Member", img: "/team_page_media/elec_team/Damon.JPG" },
      { name: "Nate Immerkar", role: "Electrical Member", img: "/team_page_media/elec_team/Nate.JPG" },
      { name: "Fredella Pang", role: "Electrical Member", img: "/team_page_media/elec_team/Fredella.JPG" },
      { name: "Noor Sheikh", role: "Electrical Member", img: "/team_page_media/elec_team/Noor.JPG" },
      { name: "Adil Ijaz", role: "Electrical Member", img: "/team_page_media/elec_team/Adil_Ijaz.JPG" },
      { name: "Joseph Kingdon", role: "Electrical Member", img: "/team_page_media/elec_team/Joseph.JPG" },
      { name: "Tristan Luo", role: "Electrical Member", img: "/team_page_media/elec_team/Tristan Luo.JPG" },
      { name: "Andy Wang", role: "Electrical Member", img: "/team_page_media/elec_team/Andy Want.JPG" },
    ],
  },
  {
    id: "software",
    name: "Software",
    blurb: "Telemetry, dashboards, firmware and this website.",
    photo: "/team_page_media/soft_team/SOFT.JPG",
    members: [
      { name: "Rumeza Fatima", role: "Software Lead", img: "/team_page_media/2026/rumeza-fatima.jpg" },
      { name: "Usman Mahmood", role: "Software Lead", img: "/team_page_media/soft_team/Usman Mahmood.JPG" },
      { name: "Kawthar Aroua", role: "Software Member", img: "/team_page_media/soft_team/Kawthar.JPG" },
      { name: "Liam Mercier", role: "Software Member", img: "/team_page_media/soft_team/Liam.JPG" },
      { name: "Hania Aamir", role: "Software Member", img: "/team_page_media/soft_team/Hania.JPG" },
      { name: "Jacob Terlesky", role: "Software Member", img: "/team_page_media/soft_team/Jacob.JPG" },
      { name: "Farhad Alizada", role: "Software Member", img: "/team_page_media/soft_team/Farhad.JPG" },
      { name: "Henis Patel", role: "Software Member", img: "/team_page_media/soft_team/Henis Patel.JPG" },
    ],
  },
  {
    id: "business",
    name: "Business",
    blurb: "Sponsorships, finance, events and keeping the shop funded.",
    photo: "/team_page_media/biz_team/BIZ.JPG",
    members: [
      { name: "Tirta Kusjanto", role: "President", img: "/team_page_media/2026/tirta-kusjanto.jpg" },
      { name: "Akila Fernando", role: "Business/Software Member", img: "/team_page_media/biz_team/Akila.JPG" },
      { name: "Janelle Ruiz", role: "Content Creation Manager", img: "/team_page_media/2026/janelle-ruiz.jpg" },
      { name: "Manal Fatima", role: "Sponsorships & Outreach Manager", img: "/team_page_media/2026/manal-fatima.jpg" },
      { name: "Roy Yang", role: "Finance Manager", img: "/team_page_media/2026/roy-yang.jpg" },
      { name: "Oliver Henderson", role: "Treasurer", img: "/team_page_media/2026/oliver-henderson.jpg" },
    ],
  },
];
