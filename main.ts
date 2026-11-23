// STAR DODGE — post-tiktok-day-one-day-seven entry program.
// Reads VIDEO.json (the TikTok video carrying this entry's video) and prints a
// deterministic summary. Standard library only, no network, no model calls.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = dirname(fileURLToPath(import.meta.url));
const VIDEO_PATH = join(ROOT, "VIDEO.json");
const PLAY_CODE = "makefun-rocker-yarn-bramble";
const REFERRAL_CODE = "cxyf1jsy";
const VIDEO = "video.mp4"; // ~31 s, 1080x1920: title, day1 vs day7 split, CTA, referral end card

function main(): void {
  let video: unknown;
  try {
    video = JSON.parse(readFileSync(VIDEO_PATH, "utf8"));
  } catch (err) {
    console.error("VIDEO.json is not readable JSON: " + (err as Error).message);
    process.exit(1);
  }
  const url = (video as { url?: unknown }).url;
  const m = typeof url === "string"
    ? url.match(/^https?:\/\/(?:www\.)?tiktok\.com\/@([^/]+)\/video\/(\d+)(?:[/?].*)?$/)
    : null;
  const out = {
    entry: "post-tiktok-day-one-day-seven-20261123-0327",
    game: "STAR DODGE",
    url: typeof url === "string" ? url : "",
    handle: m ? m[1] : "",
    videoId: m ? m[2] : "",
    playCode: PLAY_CODE,
    referralCode: REFERRAL_CODE,
    video: VIDEO,
    valid: m !== null,
  };
  console.log(JSON.stringify(out));
}

main();
