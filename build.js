import fs from "fs-extra";
import AdmZip from "adm-zip";

await fs.emptyDir("public/firefox/");
await fs.copy("source/", "public/firefox/");

await generateZip("public/firefox/", "public/firefox.zip");

await fs.emptyDir("public/chrome/");
await fs.copy("source/", "public/chrome/");

let simpleMoodle = await fs.readFile("public/chrome/simpleMoodle.js");
simpleMoodle = `\nconst browser = chrome;\n${simpleMoodle}`;
await fs.writeFile("public/chrome/simpleMoodle.js", simpleMoodle);
await generateZip("public/chrome/", "public/chrome.zip");

async function generateZip(source, destination) {
	const zip = new AdmZip();
	zip.addLocalFolder(source);
	zip.writeZip(destination);
}
