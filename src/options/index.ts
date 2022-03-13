import { getOptionsStorage } from "../shared/options-storage";

/**
 * Keeps the options form up-to-date with the options storage
 */
const syncOptionsForm = async (): Promise<void> => {
	const optionsStorage = getOptionsStorage();
	const formElement = document.querySelector("form");

	if (formElement) {
		await optionsStorage.syncForm(formElement);
	} else {
		console.error("Could not find <form> element on options page");
	}
};

syncOptionsForm();
