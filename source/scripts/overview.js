/**
 * @file
 * Changes functionality specific to the "my overview" page.
 */

const overview = document.querySelector("section.block_myoverview");
const coursesView = overview.querySelector(`div[id^="courses-view"]`);

// Ensure that the course view is set to "list"
const setView = () => {
	if (coursesView.dataset.display !== "list") {
		const listSelector = overview.querySelector(
			`#displaydropdown + ul a[data-value="list"]`,
		);
		listSelector?.click();
		// Run it once more to make sure the click was registered
		setTimeout(setView, 1000);
	}
};
setView();

// Ensure that the list is set to show 24 entries.
// We dont want to show too few or too many courses (too many causes long load times).
const setPaging = () => {
	if (coursesView.dataset.paging !== "24") {
		const pagingSelector = overview.querySelector(
			`.dropdown-menu > a.dropdown-item[data-limit="24"]`,
		);
		pagingSelector?.click();
		// Run it once more to make sure the click was registered
		setTimeout(setPaging, 1000);
	}
};
setPaging();

// Ensure that the list is set to show favorites.
// The user can change this after it has been set, but it is nice to always start with the favorites
const setGrouping = () => {
	if (coursesView.dataset.grouping !== "favourites") {
		const favoritesSelector = overview.querySelector(
			`#groupingdropdown + ul a[data-value="favourites"]`,
		);
		favoritesSelector?.click();
		// Run it once more to make sure the click was registered
		setTimeout(setGrouping, 1000);
	}
};
setGrouping();

// Make it easy to add/remove favorite courses
const attachFavoriteButtons = () => {
	for (const courseItem of document.querySelectorAll(
		".rui-course-listitem",
	)) {
		const iconSpan = courseItem.querySelector(`[id^="favorite-icon"]`);
		const icon = iconSpan?.querySelector(".icon");
		if (
			iconSpan &&
			icon &&
			iconSpan.dataset.simpleMoodleObserving !== "true"
		) {
			icon.addEventListener("click", (event) => {
				event.preventDefault();
				const action = iconSpan.classList.contains("hidden")
					? "add"
					: "remove";
				const control = courseItem.querySelector(
					`.dropdown-menu .dropdown-item[data-action="${action}-favourite"]`,
				);
				control?.click();
			});
			iconSpan.dataset.simpleMoodleObserving = "true";
		}
	}
};
const observer = new MutationObserver(attachFavoriteButtons);
observer.observe(overview, { childList: true, subtree: true });
attachFavoriteButtons();
