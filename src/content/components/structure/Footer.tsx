import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import Browser from "webextension-polyfill";

import { TreeNode } from "../../../shared/types";
import AddBookmarkIcon from "../../assets/icons/new-bookmark.svg";
import AddFolderIcon from "../../assets/icons/new-folder.svg";
import SaveIcon from "../../assets/icons/save.svg";
import SettingsIcon from "../../assets/icons/settings.svg";
import useDefaultFolderId from "../../hooks/use-default-folder-id";
import { useSelector } from "../../store/use-selector";
import { DialogInfo } from "../../types";
import styles from "./Footer.module.scss";

/**
 * Footer component with buttons
 */

interface Props {
	currentFolder: TreeNode;
	setDialogInfo: (dialogInfo: DialogInfo) => void;
}

const Footer = (props: Props): ReactElement => {
	const { currentFolder, setDialogInfo } = props;
	const { t } = useTranslation();

	const currentFolderId = useSelector((state) => state.currentFolderId);
	const [defaultFolderId, setDefaultFolderId] = useDefaultFolderId();

	const canCreateNode = currentFolder?.parentId != null;

	const createBookmark = (): void => {
		setDialogInfo({
			dialogType: "create-bookmark",
			editedNode: undefined,
			currentFolderId,
		});
	};

	const createFolder = (): void => {
		setDialogInfo({
			dialogType: "create-folder",
			editedNode: undefined,
			currentFolderId,
		});
	};

	const updateDefaultFolder = (): void => {
		setDefaultFolderId(currentFolderId);
	};

	const openSettings = async (): Promise<void> => {
		await Browser.runtime.openOptionsPage();
	};

	return (
		<footer className={styles.footer}>
			<button
				type="button"
				className={styles.footerButton}
				disabled={!canCreateNode}
				title={t("actions.createBookmark")}
				onClick={createBookmark}
			>
				<AddBookmarkIcon className={styles.footerButtonIcon} />
			</button>
			<button
				type="button"
				className={styles.footerButton}
				disabled={!canCreateNode}
				title={t("actions.createFolder")}
				onClick={createFolder}
			>
				<AddFolderIcon className={styles.footerButtonIcon} />
			</button>
			<button
				type="button"
				className={styles.footerButton}
				disabled={currentFolderId === defaultFolderId}
				title={t("actions.setDefaultDirectory")}
				onClick={updateDefaultFolder}
			>
				<SaveIcon className={styles.footerButtonIcon} />
			</button>
			<button
				type="button"
				className={styles.footerButton}
				title={t("actions.settings")}
				onClick={openSettings}
			>
				<SettingsIcon className={styles.footerButtonIcon} />
			</button>
		</footer>
	);
};

export default Footer;
