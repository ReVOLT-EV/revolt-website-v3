import localFont from "next/font/local";

// Brand book v0.2 type system. Files are self-hosted in ./fonts (see README there),
// so builds never depend on fonts.googleapis.com being reachable.

// Display: Stalinist One. One weight; never below 18px; never for sentences.
export const stalinist = localFont({
  src: "./fonts/stalinist-one-400.woff2",
  weight: "400",
  variable: "--font-stalinist",
  display: "swap",
  fallback: ["Arial Black", "sans-serif"],
});

// Body & UI: Roboto (variable)
export const roboto = localFont({
  src: "./fonts/roboto-var.woff2",
  weight: "400 700",
  variable: "--font-roboto",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

// Labels & data: JetBrains Mono (variable)
export const jetbrains = localFont({
  src: "./fonts/jetbrains-mono-var.woff2",
  weight: "400 700",
  variable: "--font-jetbrains",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

// Intro game only
export const pixel = localFont({
  src: "./fonts/press-start-2p-400.woff2",
  weight: "400",
  variable: "--font-pixel-raw",
  display: "swap",
  fallback: ["monospace"],
});

export const fontVariables = [stalinist.variable, roboto.variable, jetbrains.variable, pixel.variable].join(" ");
