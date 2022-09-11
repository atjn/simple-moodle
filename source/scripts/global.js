
/**
 * @file
 * Responsible for adding the global extension toggle, along with the global menu when the extension is enabled.
 */

class SimpleMoodleToggle extends HTMLElement{

	connectedCallback(){

		this.attachShadow({mode: "open"});

		// Putting this in JS is stupid, but there is no native way to import it from an html template file (╯°□°)╯︵ ┻━┻
		const template = `
<style>
input[name="simpleMoodleToggle"] {
	vertical-align: middle;
}
</style>
<label for="simpleMoodleToggle">Simple Moodle</label>
<input name="simpleMoodleToggle" type="checkbox"> 
		`;

		this.shadowRoot.innerHTML = template;

		const checkbox = this.shadowRoot.querySelector("input");
		checkbox.checked = getEnabled();
		checkbox.addEventListener("change", async event => {
			setEnabled(event.target.checked);
			window.location.reload();
		});

	}

}

class SimpleMoodleNavigation extends HTMLElement{

	connectedCallback(){

		this.attachShadow({mode: "open"});

		// Putting this in JS is stupid, but there is no native way to import it from an html template file (╯°□°)╯︵ ┻━┻
		const template = `
<style>
a {
	color: var(--text-color);
	text-decoration: none;
	padding: .2em .4em;
	margin-left: 1em;
	background-color: var(--item-color);
	border: 1px solid;
	border-color: var(--item-border-color);
	border-radius: 3px;
	transition: background-color .1s ease-out;
}
a:hover, a:focus {
	background-color: var(--item-color-highlight);
}
</style>
<a href="/">Courses</a>
<a href="/local/planning/calendar.php">Calendar</a>
		`;

		this.shadowRoot.innerHTML = template;

	}

}

const navbar = document.querySelector("nav.navbar");
if(navbar){

	// If the user isn't logged in, immediately redirect them to the login page
	const userLogin = navbar.querySelector(".usermenu .login a");
	if(userLogin){
		window.location.href = userLogin.href;
	}

	customElements.define("simple-moodle-toggle", SimpleMoodleToggle);
	const toggle = document.createElement("simple-moodle-toggle");
	navbar.appendChild(toggle);

	if(getEnabled()){

		customElements.define("simple-moodle-navigation", SimpleMoodleNavigation);
		const navigation = document.createElement("simple-moodle-navigation");
		navbar.appendChild(navigation);

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

/**
 * Sets the extension as either enabled or disabled.
 *
 * @param {boolean} enabled - True if the extension should be enabled, false if it should not.
 */
function setEnabled(enabled){
	localStorage.setItem("simpleMoodleEnabled", Boolean(enabled));
}
