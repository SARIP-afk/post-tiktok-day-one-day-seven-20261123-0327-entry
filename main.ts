// STAR DODGE — post-tiktok-day-one-day-seven entry program.
// Reads VIDEO.json (the TikTok video carrying this entry) and prints a
// one-line JSON summary: entry id, game, video handle/id, play code and
// whether the link parses as a TikTok video URL. Node stdlib only.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ENTRY_ID = "post-tiktok-day-one-day-seven-20261123-0327";
const GAME_NAME = "STAR DODGE";
const PLAY_CODE = "makefun-rocker-yarn-bramble";
const REFERRAL = "cxyf1jsy";
const TIKTOK_VIDEO =
  /^https?:\/\/(?:www\.)?tiktok\.com\/@([^/]+)\/video\/(\d+)(?:[/?].*)?$/;

function loadVideoMeta(root: string): { url?: unknown } {
  const text = readFileSync(join(root, "VIDEO.json"), "utf8");
  const parsed: unknown = JSON.parse(text);
  if (typeof parsed !== "object" || parsed === null) {
    throw new Error("VIDEO.json did not contain a JSON object");
  }
  return parsed as { url?: unknown };
}

function describeVideo(url: unknown) {
  if (typeof url !== "string") return { url: "", handle: "", videoId: "", ok: false };
  const found = url.match(TIKTOK_VIDEO);
  return {
    url,
    handle: found ? found[1] : "",
    videoId: found ? found[2] : "",
    ok: found !== null,
  };
}

function main(): void {
  const root = dirname(fileURLToPath(import.meta.url));
  let meta: { url?: unknown };
  try {
    meta = loadVideoMeta(root);
  } catch (err) {
    console.error("cannot read VIDEO.json: " + (err as Error).message);
    process.exit(1);
  }
  const video = describeVideo(meta.url);
  const summary = {
    entry: ENTRY_ID,
    game: GAME_NAME,
    url: video.url,
    handle: video.handle,
    videoId: video.videoId,
    playCode: PLAY_CODE,
    referralCode: REFERRAL,
    video: "video.mp4",
    valid: video.ok,
  };
  console.log(JSON.stringify(summary));
}

main();
