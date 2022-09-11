
import fs from "fs-extra";


await fs.emptyDir("public/firefox/");
await fs.copy("source/", "public/firefox/");

const manifest = await fs.readJson("public/firefox/manifest.json");
manifest.manifest_version = 2;
const links = [];
for(const resource of manifest.web_accessible_resources){
	for(const link of resource.resources){
		links.push(link);
	}
}
manifest.web_accessible_resources = links;
await fs.writeJson("public/firefox/manifest.json", manifest, { spaces: "\t" });


await fs.emptyDir("public/chrome/");
await fs.copy("source/", "public/chrome/");

let simpleMoodle = await fs.readFile("public/chrome/simpleMoodle.js");
simpleMoodle = `\nconst browser = chrome;\n${simpleMoodle}`;
await fs.writeFile("public/chrome/simpleMoodle.js", simpleMoodle);
