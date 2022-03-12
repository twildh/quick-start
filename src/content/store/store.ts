import { applyMiddleware, createStore } from "redux"
import { createLogger } from "redux-logger"
import thunk, { ThunkMiddleware } from "redux-thunk"

import reducer from "./reducer"
import { ActionT, State } from "./types"

// Set up middleware
let middleware = [thunk as ThunkMiddleware<State, ActionT>]
if (process.env.NODE_ENV !== "production") {
  middleware = [...middleware, createLogger()]
}

// Create store
export const store = createStore(reducer, applyMiddleware(...middleware))
