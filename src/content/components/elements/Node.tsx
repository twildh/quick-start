import React, { DragEvent, MouseEvent, ReactElement } from "react";
import { useDispatch } from "react-redux";

import { TreeNode } from "../../../shared/types";
import {
  setCurrentFolderId,
  setDraggedNodeId,
  setFolderHoverTimer,
} from "../../store/action-creators";
import { moveNodeInFolder, moveNodeToFolder } from "../../store/thunks";
import { useSelector } from "../../store/use-selector";
import styles from "./Node.module.scss";
import NodeIcon from "./NodeIcon";
import NodeTitle from "./NodeTitle";

interface Props {
  index: number;
  node: TreeNode;
  moveDndElement: (nodeId: string, newIndex: number) => void;
  updateContextMenu: (
    isOpen: boolean,
    x: number,
    y: number,
    selectedNode?: TreeNode,
  ) => void;
}

const Node = (props: Props): ReactElement => {
  const { index, moveDndElement, node, updateContextMenu } = props;

  const dispatch = useDispatch();

  const { draggedNodeId, timeout } = useSelector((state) => ({
    draggedNodeId: state.draggedNodeId,
    timeout: state.folderHoverTimeout,
  }));

  const cancelTimeout = () => {
    if (timeout) {
      clearTimeout(timeout?.timer);
      dispatch(setFolderHoverTimer(undefined));
    }
  };

  const onDragStart = (): void => {
    // Function is executed on the node that is being dragged
    dispatch(setDraggedNodeId(node.id));
  };

  const onDragEnd = (
    event: DragEvent<HTMLAnchorElement | HTMLButtonElement>,
  ): void => {
    // Function is executed on the node that is being dragged
    event.preventDefault();
    dispatch(setDraggedNodeId(undefined));
  };

  const onDragOver = (
    event: DragEvent<HTMLAnchorElement | HTMLButtonElement>,
  ): void => {
    // Function is executed on the node that serves as the drop zone
    event.preventDefault();
  };

  const onDragEnter = (
    event: DragEvent<HTMLAnchorElement | HTMLButtonElement>,
  ): void => {
    // Function is executed on the node that serves as the drop zone
    event.preventDefault();
    cancelTimeout();

    if (node.type === "folder" && draggedNodeId !== node.id) {
      const timer = window.setTimeout(() => {
        dispatch(setFolderHoverTimer(undefined));
        if (draggedNodeId) {
          moveDndElement(draggedNodeId, index);
        }
      }, 1200);
      dispatch(setFolderHoverTimer({ id: node.id, timer: timer }));
      return;
    }

    if (draggedNodeId) {
      moveDndElement(draggedNodeId, index);
    }
  };

  const onDragLeave = (
    event: DragEvent<HTMLAnchorElement | HTMLButtonElement>,
  ): void => {
    event.preventDefault();
    cancelTimeout();
  };

  const onDrop = (
    event: DragEvent<HTMLAnchorElement | HTMLButtonElement>,
  ): void => {
    // Function is executed on the node that serves as the drop zone
    event.preventDefault();

    if (draggedNodeId) {
      if (timeout?.id == node.id) {
        dispatch(moveNodeToFolder(draggedNodeId, node.id));
        cancelTimeout();
      } else {
        dispatch(moveNodeInFolder(draggedNodeId, index));
      }
      dispatch(setDraggedNodeId(undefined));
    }
  };

  const onFolderClick = (): void => {
    dispatch(setCurrentFolderId(node.id));
  };

  const onRightClick = (event: MouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    updateContextMenu(true, event.pageX, event.pageY, node);
  };

  const elementProps = {
    draggable: true,
    onContextMenu: onRightClick,
    onDragStart,
    onDragEnter,
    onDragOver,
    onDragEnd,
    onDragLeave,
    onDrop,
  };

  // Folder node
  if (node.type === "folder") {
    return (
      <button
        type="button"
        onClick={onFolderClick}
        className={styles.node}
        {...elementProps}
      >
        <NodeIcon
          node={node}
          hoveredOn={node.id === timeout?.id}
          hoverActive={Boolean(draggedNodeId)}
        />
        <NodeTitle node={node} />
      </button>
    );
  }

  // Bookmark node
  return (
    <a href={node.url} className={styles.node} {...elementProps}>
      <NodeIcon node={node} />
      <NodeTitle node={node} />
    </a>
  );
};

export default Node;
