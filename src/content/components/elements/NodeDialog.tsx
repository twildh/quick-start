import React, { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { createBookmark, createFolder, updateBookmark, updateFolder } from "../../store/thunks";
import { DialogInfo } from "../../types";
import Modal from "./Modal";
import styles from "./NodeDialog.module.scss";

interface Props {
	dialogInfo: DialogInfo;
	setDialogInfo: (dialogInfo: DialogInfo) => void;
}

const isValidBookmarkUrl = (url: string): boolean => {
	if (!url) {
		return false;
	}
	const lowerCaseUrl = url.toLowerCase();
	return (
		lowerCaseUrl.startsWith("http://") ||
		lowerCaseUrl.startsWith("https://") ||
		lowerCaseUrl.startsWith("javascript")
	);
};

const isValidTitle = (title: string): boolean => title !== "";

/**
 * Dialog for creating and editing bookmarks/folders
 */
const NodeDialog = (props: Props): ReactElement => {
	const { dialogInfo, setDialogInfo } = props;
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const [nodeTitle, setNodeTitle] = useState<string>(dialogInfo.editedNode?.title ?? "");
	const [nodeUrl, setNodeUrl] = useState<string>(dialogInfo.editedNode?.url ?? "");

	const isCreateDialog = dialogInfo.dialogType.startsWith("create");
	const isFolderDialog = dialogInfo.dialogType.endsWith("folder");
	const canSubmit = isValidTitle(nodeTitle) && (isFolderDialog || isValidBookmarkUrl(nodeUrl));

	const applyEdits = (): void => {
		switch (dialogInfo.dialogType) {
			case "create-bookmark": {
				if (dialogInfo.currentFolderId) {
					dispatch(createBookmark(dialogInfo.currentFolderId, nodeTitle, nodeUrl));
				} else {
					console.error("Could not create bookmark: Missing `currentFolderId`");
				}
				break;
			}
			case "create-folder": {
				if (dialogInfo.currentFolderId) {
					dispatch(createFolder(dialogInfo.currentFolderId, nodeTitle));
				} else {
					console.error("Could not create folder: Missing `currentFolderId`");
				}
				break;
			}
			case "edit-bookmark": {
				if (dialogInfo.editedNode?.id) {
					dispatch(updateBookmark(dialogInfo.editedNode.id, nodeTitle, nodeUrl));
				} else {
					console.error("Could not edit bookmark: Missing `id`");
				}
				break;
			}
			case "edit-folder": {
				if (dialogInfo.editedNode?.id) {
					dispatch(updateFolder(dialogInfo.editedNode.id, nodeTitle));
				} else {
					console.error("Could not edit folder: Missing `id`");
				}
				break;
			}
			default:
				console.error(
					`Cannot submit form: \`dialogType\` "${dialogInfo.dialogType}" is not supported`,
				);
		}
	};

	const onClose = (): void => {
		setDialogInfo({ dialogType: "none", editedNode: undefined });
	};

	const onTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setNodeTitle(event.target.value);
	};

	const onUrlChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setNodeUrl(event.target.value);
	};

	const onSubmit = (event: FormEvent): void => {
		event.preventDefault();
		applyEdits();
		onClose();
	};

	const title = `${isCreateDialog ? t("actions.create") : t("actions.edit")}: ${
		isFolderDialog ? t("types.folder") : t("types.bookmark")
	}`;
	return (
		<Modal onClose={onClose}>
			<div className={styles.nodeDialog}>
				<h1 className={styles.formTitle}>{title}</h1>
				<form onSubmit={onSubmit}>
					<label className={styles.formLabel} htmlFor="title-input">
						<p className={styles.formLabelText}>{t("fields.title")}</p>
						<input
							className={styles.formInput}
							type="text"
							name="title-input"
							value={nodeTitle}
							placeholder={t("fields.title")}
							autoFocus // eslint-disable-line jsx-a11y/no-autofocus
							onChange={onTitleChange}
						/>
					</label>
					{!isFolderDialog && (
						<label className={styles.formLabel} htmlFor="url-input">
							<p className={styles.formLabelText}>{t("fields.url")}</p>
							<input
								className={styles.formInput}
								type="text"
								name="url-input"
								value={nodeUrl}
								placeholder="https://"
								onChange={onUrlChange}
							/>
						</label>
					)}
					<input
						className={`button-large ${styles.formSubmitButton}`}
						type="submit"
						value={(isCreateDialog ? t("actions.create") : t("actions.save")) as string}
						disabled={!canSubmit}
					/>
				</form>
			</div>
		</Modal>
	);
};

export default NodeDialog;
