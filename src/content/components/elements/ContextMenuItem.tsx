import React, { ReactElement } from "react"

import styles from "./ContextMenuItem.module.scss"

interface Props {
  disabled: boolean
  label: string
  onClick: () => void
}

const ContextMenuItem = (props: Props): ReactElement => {
  const { disabled, label, onClick } = props

  return (
    <button
      type="button"
      className={styles.contextMenuItem}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default ContextMenuItem
