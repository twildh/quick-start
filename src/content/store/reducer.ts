import {
  ActionT,
  SET_BOOKMARKS,
  SET_CURRENT_FOLDER_ID,
  SET_DRAGGED_NODE_ID,
  State,
} from "./types"

const initialState: State = {
  bookmarks: {},
  currentFolderId: undefined,
  draggedNodeId: undefined,
}

function reducer(state = initialState, action: ActionT): State {
  switch (action.type) {
    case SET_BOOKMARKS: {
      return {
        ...state,
        bookmarks: action.payload.bookmarks,
      }
    }
    case SET_CURRENT_FOLDER_ID: {
      return {
        ...state,
        currentFolderId: action.payload.currentFolderId,
      }
    }
    case SET_DRAGGED_NODE_ID: {
      return {
        ...state,
        draggedNodeId: action.payload.draggedNodeId,
      }
    }
    default:
      return state
  }
}

export default reducer
