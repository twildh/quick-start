import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import Browser from "webextension-polyfill";

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
	const { t } = useTranslation();

	const dispatch = useDispatch();

	const bookmarks = useSelector((state) => state.bookmarks);

	const parentId = selectedNode?.parentId;
	const grandParentId = parentId ? bookmarks[parentId].parentId : undefined;
	const greatGrandParentId = grandParentId ? bookmarks[grandParentId].parentId : undefined;

	// Folders cannot be copied (don't have a URL)
	const canCopy = selectedNode?.type === "bookmark";

	// Folder can not be opend in a new tab / incognito window
	const canOpenInNew = selectedNode?.type === "bookmark";

	// Node can be deleted if it's not in the root directory
	const canDelete = grandParentId != null;

	// Node can be edited if it's not in the root directory
	const canEdit = grandParentId != null;

	// Node can be moved up if it wouldn't move it into the root directory
	const canMoveUp = greatGrandParentId != null;

	const onCopyClick = async (): Promise<void> => {
		if (selectedNode?.url) {
			await navigator.clipboard.writeText(selectedNode.url);
		} else {
			console.error("Cannot copy to clipboard: Missing URL");
		}
	};

	const onOpenInNewTab = () => {
		window.open(selectedNode?.url, "_blank");
	};

	const onOpenInIncognito = async () => {
		try {
			await Browser.windows.create({ url: selectedNode?.url, incognito: true });
		} catch {
			alert(t("errors.incognitoDisabled"));
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

	const onMoveUpClick = (): void => {
		if (!selectedNode) {
			console.error("Cannot move node into parent directory: No node provided");
		} else if (grandParentId) {
			dispatch(moveNodeToFolder(selectedNode.id, grandParentId));
		} else {
			console.error("Cannot move node into parent directory: Parent directory not exist");
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
					<ContextMenuItem disabled={!canCopy} label={t("actions.copy")} onClick={onCopyClick} />
				</li>
				<li>
					<ContextMenuItem
						disabled={!canOpenInNew}
						label={t("actions.openInNewTab")}
						onClick={onOpenInNewTab}
					/>
				</li>
				<li>
					<ContextMenuItem
						disabled={!canOpenInNew}
						label={t("actions.openInIncognito")}
						onClick={onOpenInIncognito}
					/>
				</li>
				<li>
					<ContextMenuItem
						disabled={!canEdit}
						label={t("actions.editItem")}
						onClick={onEditClick}
					/>
				</li>
				<li>
					<ContextMenuItem
						disabled={!canMoveUp}
						label={t("actions.moveUp")}
						onClick={onMoveUpClick}
					/>
				</li>
				<li>
					<ContextMenuItem
						disabled={!canDelete}
						label={t("actions.delete")}
						onClick={onDeleteClick}
					/>
				</li>
			</ul>
		</div>
	);
};

export default ContextMenu;
