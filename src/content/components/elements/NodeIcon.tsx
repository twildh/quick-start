import React, { ReactElement, useState } from "react";

import { TreeNode } from "../../../shared/types";
import FolderIcon from "../../assets/icons/folder.svg";
import { getIconUrl } from "../../utils/icon";
import styles from "./NodeIcon.module.scss";

interface Props {
  node: TreeNode;
}

const NodeIcon = (props: Props): ReactElement => {
  const { node } = props;

  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  // Folder icon
  if (node.type === "folder") {
    return <FolderIcon className={styles.folderIcon} />;
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
