import React, { ReactElement } from "react"

import styles from "./Spinner.module.scss"

/**
 * Spinner for indicating that part of the UI is currently loading
 */
const Spinner = (): ReactElement => (
  <div className={styles.spinner}>
    <div className={styles.bounce1} />
    <div className={styles.bounce2} />
    <div className={styles.bounce3} />
  </div>
)

export default Spinner
