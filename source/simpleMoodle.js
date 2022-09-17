
/**
 * @file
 * Tests whether we are on a Moodle URL, and if true, tries to add the correct JS and CSS for that particular page type. 
 */

const filter = /\bmoodle\b/ui;
if(filter.test(window.location.hostname)){

	const head = new Promise(resolve => {
		const getHead = () => {
			if(document.head){
				resolve(document.head);
				return;
			}
			setTimeout(getHead, 5);
		};
		getHead();
	});

	(async () => {
		const globalScript = document.createElement("script");
		globalScript.src = browser.runtime.getURL("scripts/global.js");
		(await head).appendChild(globalScript);
	})();

	if(getEnabled()){

		(async () => {
			const globalStyle = document.createElement("link");
			globalStyle.rel = "stylesheet"; globalStyle.href = browser.runtime.getURL("styles/global.css");
			(await head).appendChild(globalStyle);
		})();

		let hasLoaded = false;
		const load = () => {
			if(hasLoaded) return;
			hasLoaded = true;

			// Overview
			if(document.querySelector("section.block_myoverview")){

				const style = document.createElement("link");
				style.rel = "stylesheet"; style.href = browser.runtime.getURL("styles/overview.css");
				document.head.appendChild(style);

				const script = document.createElement("script");
				script.type = "module"; script.src = browser.runtime.getURL("scripts/overview.js");
				document.head.appendChild(script);

			// Course
			}else if(document.querySelector("body#page-course-view-topics")){

				const style = document.createElement("link");
				style.rel = "stylesheet"; style.href = browser.runtime.getURL("styles/course.css");
				document.head.appendChild(style);

			// Calendar
			}else if(document.querySelector("#calendar")){

				const style = document.createElement("link");
				style.rel = "stylesheet"; style.href = browser.runtime.getURL("styles/calendar.css");
				document.head.appendChild(style);

			}

		};
		window.addEventListener("DOMContentLoaded", load);
		window.addEventListener("load", load);
		if(document.readyState !== "loading") load();

	}

}

/**
 * Tells whether or not the extension is enabled by the user.
 *
 * @returns {boolean} - True if the extension is enabled, false if it is not.
 */
function getEnabled(){
	return localStorage.getItem("simpleMoodleEnabled") !== "false";
}
