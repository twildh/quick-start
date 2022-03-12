import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from "react-redux"

import { State } from "./types"

export const useSelector: TypedUseSelectorHook<State> = useReduxSelector
