import React, { ReactElement } from "react";

import { TreeNode } from "../../../shared/types";
import styles from "./NodeTitle.module.scss";

interface Props {
  node: TreeNode;
}

const NodeTitle = (props: Props): ReactElement => {
  const { node } = props;

  return <p className={styles.nodeTitle}>{node.title}</p>;
};

export default NodeTitle;
