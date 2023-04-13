import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import App from "./components/App";
import { store } from "./store/store";
import "minireset.css/minireset.min.css";
import "./index.scss";

import en from "./locale/en.json";
import de from "./locale/de.json";

i18n.use(initReactI18next).init({
	resources: {
		en: { common: en },
		de: { common: de },
	},
	lng: "en",
	defaultNS: "common",
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});

// Create "root" div
const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

// Render React app in root
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	root,
);
