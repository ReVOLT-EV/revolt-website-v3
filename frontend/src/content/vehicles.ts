export type Spec = { label: string; value: string };
export type Vehicle = {
  id: "moto" | "snow";
  tag: string;
  name: string;
  status: string;
  tone: "volt" | "glacier";
  summary: string;
  specs: Spec[];
  milestones: { label: string; done: boolean }[];
};

// PLACEHOLDER CONTENT: spec values ("TBA") and milestone done/not-done states are
// rough guesses for layout. Confirm with the mech/elec leads before launch.
export const vehicles: Vehicle[] = [
  {
    id: "moto",
    tag: "Build 01",
    name: "Electric motorcycle",
    status: "2025–26 season · in progress",
    tone: "volt",
    summary:
      "A donor gas motorcycle, stripped back to the frame and rebuilt around a custom battery pack and electric drivetrain. Built to race against gas and electric machines.",
    specs: [
      { label: "Motor", value: "TBA kW" },
      { label: "Pack", value: "TBA kWh" },
      { label: "Range", value: "TBA km" },
      { label: "Top speed", value: "TBA km/h" },
    ],
    milestones: [
      { label: "Donor bike stripped", done: true },
      { label: "Frame & battery box design", done: true },
      { label: "Battery pack build", done: false },
      { label: "Powertrain integration", done: false },
      { label: "Testing & first race", done: false },
    ],
  },
  {
    id: "snow",
    tag: "Build 02",
    name: "Electric snowmobile",
    status: "Next build · planning",
    tone: "glacier",
    summary:
      "Taking what we learned on the bike to the snow: an electric powertrain built for cold weather, high torque and Alberta winters.",
    specs: [
      { label: "Motor", value: "TBA kW" },
      { label: "Pack", value: "TBA kWh" },
      { label: "Range", value: "TBA km" },
      { label: "Operating temp", value: "TBA °C" },
    ],
    milestones: [
      { label: "Concept & research", done: true },
      { label: "Donor sled sourced", done: false },
      { label: "Cold-weather pack design", done: false },
      { label: "Build & test", done: false },
    ],
  },
];
