import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";

import { deleteBookmark, deleteFolder, moveNodeToFolder } from "../../store/thunks";
import { useSelector } from "../../store/use-selector";
import { ContextMenuInfo, DialogInfo } from "../../types";
import styles from "./ContextMenu.module.scss";
import ContextMenuItem from "./ContextMenuItem";

interface Props {
	contextMenuInfo: ContextMenuInfo;
	setDialogInfo: (dialogInfo: DialogInfo) => void;
}

const ContextMenu = (props: Props): ReactElement => {
	const { contextMenuInfo, setDialogInfo } = props;
	const { x, y, isOpen, selectedNode } = contextMenuInfo;

	const dispatch = useDispatch();

	const bookmarks = useSelector((state) => state.bookmarks);

	const parentId = selectedNode?.parentId;
	const grandParentId = parentId ? bookmarks[parentId].parentId : undefined;
	const greatGrandParentId = grandParentId ? bookmarks[grandParentId].parentId : undefined;

	// Node can be moved up if it wouldn't move it into the root directory
	const canMoveUp = greatGrandParentId != null;

	// Node can be deleted if it's not in the root directory
	const canDelete = grandParentId != null;

	// Node can be edited if it's not in the root directory
	const canEdit = grandParentId != null;

	const onMoveUpClick = (): void => {
		if (!selectedNode) {
			console.error("Cannot move node into parent directory: No node provided");
		} else if (grandParentId) {
			dispatch(moveNodeToFolder(selectedNode.id, grandParentId));
		} else {
			console.error("Cannot move node into parent directory: Parent directory not exist");
		}
	};

	const onDeleteClick = (): void => {
		if (selectedNode) {
			dispatch(
				selectedNode.type === "folder"
					? deleteFolder(selectedNode.id)
					: deleteBookmark(selectedNode.id),
			);
		} else {
			console.error("Cannot delete node: No node provided");
		}
	};

	const onEditClick = (): void => {
		if (selectedNode) {
			setDialogInfo({
				dialogType: selectedNode.type === "folder" ? "edit-folder" : "edit-bookmark",
				editedNode: selectedNode,
				currentFolderId: undefined,
			});
		} else {
			console.error("Cannot edit node: No node provided");
		}
	};

	return (
		<div
			className={styles.contextMenu}
			style={{
				display: isOpen ? "block" : "none",
				left: x,
				top: y,
			}}
		>
			<ul>
				<li>
					<ContextMenuItem disabled={!canEdit} label="Edit" onClick={onEditClick} />
				</li>
				<li>
					<ContextMenuItem disabled={!canMoveUp} label="Move up" onClick={onMoveUpClick} />
				</li>
				<li>
					<ContextMenuItem disabled={!canDelete} label="Delete" onClick={onDeleteClick} />
				</li>
			</ul>
		</div>
	);
};

export default ContextMenu;
