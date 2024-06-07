import fs from "fs-extra";
import AdmZip from "adm-zip";

await fs.emptyDir("public/firefox/");
await fs.copy("source/", "public/firefox/");

// Firefox does not use the fallback PNG's and they bloat the zip file, so remove them
const imageEntries = await fs.readdir("public/firefox/images");
for (const imageEntry of imageEntries) {
	if (imageEntry.endsWith(".png") || imageEntry.endsWith(".md")) {
		await fs.remove("public/firefox/images/" + imageEntry);
	}
}
await generateZip("public/firefox/", "public/firefox.zip");

await fs.emptyDir("public/chrome/");
await fs.copy("source/", "public/chrome/");

// Chrome uses a different global namespace
let simpleMoodle = await fs.readFile("public/chrome/simpleMoodle.js");
simpleMoodle = `\nconst browser = chrome;\n${simpleMoodle}`;
await fs.writeFile("public/chrome/simpleMoodle.js", simpleMoodle);

// Chrome does not support SVG icons, so use PNG instead
const manifest = await fs.readJson("public/chrome/manifest.json");
for (const [key, path] of Object.entries(manifest.icons)) {
	manifest.icons[key] = path.replace(".svg", `-${key}.png`);
}
await fs.writeJson("public/chrome/manifest.json", manifest, { spaces: "\t" });
await generateZip("public/chrome/", "public/chrome.zip");

async function generateZip(source, destination) {
	const zip = new AdmZip();
	zip.addLocalFolder(source);
	zip.writeZip(destination);
}
