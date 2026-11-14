export const INTRO_SEEN_KEY = "revolt-intro-seen";
export const REPLAY_EVENT = "revolt:replay-intro";

/**
 * Runs before first paint (inlined in the home page) so there's no flash of the
 * site before the game: sets <html data-intro="on"> when the intro should play.
 * Skipped for returning visitors this session and for reduced-motion users.
 */
export const introBootScript = `(function(){try{var d=document.documentElement;var seen=sessionStorage.getItem("${INTRO_SEEN_KEY}");var rm=window.matchMedia("(prefers-reduced-motion: reduce)").matches;d.dataset.intro=(!seen&&!rm)?"on":"off";}catch(e){}})();`;
