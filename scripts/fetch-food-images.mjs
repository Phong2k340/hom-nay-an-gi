import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const source = await readFile(path.join(root, "data", "foods.ts"), "utf8");
const names = [...source.matchAll(/\["([^"]+)",\["/g)].map((match) => match[1]);
const outputDirectory = path.join(root, "public", "images", "foods");
await mkdir(outputDirectory, { recursive: true });

const normalize = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const fileSafeName = (name) => normalize(name).replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function findFoodPhoto(name) {
  await delay(1500);
  const query = new URLSearchParams({
    action: "query", generator: "search", gsrsearch: name, gsrnamespace: "6", gsrlimit: "8",
    prop: "imageinfo", iiprop: "url", iiurlwidth: "960", format: "json", origin: "*",
  });
  const response = await fetch("https://commons.wikimedia.org/w/api.php?" + query);
  if (!response.ok) return null;
  const pages = Object.values((await response.json()).query?.pages ?? {});
  const candidate = pages.find((page) => {
    const title = normalize(page.title ?? "");
    return !/(logo|icon|map|flag|sign)/.test(title);
  });
  return candidate?.imageinfo?.[0]?.thumburl ?? null;
}

const mappings = {};
for (const name of names) {
  const imageUrl = await findFoodPhoto(name);
  if (!imageUrl) { console.warn("No matching Commons image: " + name); continue; }
  const filename = fileSafeName(name) + ".jpg";
  const imageResponse = await fetch(imageUrl);
  if (!imageResponse.ok) { console.warn("Could not download: " + name); continue; }
  await writeFile(path.join(outputDirectory, filename), Buffer.from(await imageResponse.arrayBuffer()));
  mappings[name] = "/images/foods/" + filename;
  console.log("Saved: " + name);
}

const file = "// Generated from Wikimedia Commons. Do not edit manually.\nexport const foodImages: Record<string, string> = " + JSON.stringify(mappings, null, 2) + ";\n";
await writeFile(path.join(root, "data", "foodImages.ts"), file);
console.log("Matched " + Object.keys(mappings).length + "/" + names.length + " foods.");
