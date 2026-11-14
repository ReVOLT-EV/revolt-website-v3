export type Phase = "wait" | "walk" | "convert" | "ride" | "finish" | "done";

export interface GameState {
  phase: Phase;
  /** distance travelled along the route */
  d: number;
  [key: string]: unknown;
}

export interface Game {
  readonly width: number;
  readonly height: number;
  /** RGBA pixel buffer, width × height × 4 */
  readonly buffer: Uint8ClampedArray;
  readonly state: GameState;
  /** total route length */
  readonly D: number;
  input: { left: boolean; right: boolean; up: boolean; tap: boolean };
  resize(w: number, h: number): void;
  reset(now: number): void;
  update(dt: number, now: number): void;
  draw(now: number): void;
  onPhase: (phase: Phase) => void;
  onWheelie: () => void;
}

export function createGame(): Game;
