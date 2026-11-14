import { JetBrains_Mono, Press_Start_2P, Roboto, Stalinist_One } from "next/font/google";

// Brand book v0.2 type system
// Display: Stalinist One. One weight; never below 18px; never for sentences.
export const stalinist = Stalinist_One({ subsets: ["latin"], weight: "400", variable: "--font-stalinist", display: "swap" });
// Body & UI: Roboto
export const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-roboto", display: "swap" });
// Labels & data: JetBrains Mono. To try pixel labels, swap this for Pixelify_Sans and keep the variable name.
export const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-jetbrains", display: "swap" });
// Intro game only
export const pixel = Press_Start_2P({ subsets: ["latin"], weight: "400", variable: "--font-pixel-raw", display: "swap" });

export const fontVariables = [stalinist.variable, roboto.variable, jetbrains.variable, pixel.variable].join(" ");
