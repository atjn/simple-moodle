
/**
 * @file
 * Tests whether we are on a Moodle URL, and if true, tries to add the correct JS and CSS for that particular page type. 
 */

const filter = /\bmoodle\b/ui;
if(filter.test(window.location.hostname)){

	const globalScript = document.createElement("script");
	globalScript.type = "module"; globalScript.src = browser.runtime.getURL("scripts/global.js");
	document.head.appendChild(globalScript);

	if(getEnabled()){

		const globalStyle = document.createElement("link");
		globalStyle.rel = "stylesheet"; globalStyle.href = browser.runtime.getURL("styles/global.css");
		document.head.appendChild(globalStyle);

		const overview = document.querySelector("section.block_myoverview");
		const course = document.querySelector("body#page-course-view-topics");
		const calendar = document.querySelector("#calendar");

		if(overview){

			const style = document.createElement("link");
			style.rel = "stylesheet"; style.href = browser.runtime.getURL("styles/overview.css");
			document.head.appendChild(style);

			const script = document.createElement("script");
			script.type = "module"; script.src = browser.runtime.getURL("scripts/overview.js");
			document.head.appendChild(script);

		}else if(course){

			const style = document.createElement("link");
			style.rel = "stylesheet"; style.href = browser.runtime.getURL("styles/course.css");
			document.head.appendChild(style);

		}else if(calendar){

			const style = document.createElement("link");
			style.rel = "stylesheet"; style.href = browser.runtime.getURL("styles/calendar.css");
			document.head.appendChild(style);

		}
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
