import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import App from "./components/App"
import { store } from "./store/store"
import "minireset.css/minireset.min.css"
import "./index.scss"

// Create "root" div
const root = document.createElement("div")
root.id = "root"
document.body.appendChild(root)

// Render React app in root
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root,
)
