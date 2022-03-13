import React, { ReactElement, useState } from "react";

import { TreeNode } from "../../../shared/types";
import FolderIcon from "../../assets/icons/folder.svg";
import FolderOpenIcon from "../../assets/icons/folder-open.svg";
import { getIconUrl } from "../../utils/icon";
import styles from "./NodeIcon.module.scss";

interface Props {
  node: TreeNode;
  hoveredOn?: boolean;
  hoverActive?: boolean;
}

const NodeIcon = (props: Props): ReactElement => {
  const { node, hoveredOn = false, hoverActive = false } = props;

  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  // Folder icon
  if (node.type === "folder") {
    const className = `${styles.folderIcon} ${
      hoverActive ? styles.disallowUserSelect : styles.allowUserSelect
    }`;

    return hoveredOn ? (
      <FolderOpenIcon className={className} />
    ) : (
      <FolderIcon className={className} />
    );
  }

  // Bookmark icon
  return (
    <img
      src={node.url ? getIconUrl(node.url) : ""}
      alt=""
      className={`${styles.bookmarkIcon} ${
        isImageLoaded ? "" : styles.bookmarkPlaceholderIcon
      }`}
      onLoad={(): void => setIsImageLoaded(true)}
    />
  );
};

export default NodeIcon;
