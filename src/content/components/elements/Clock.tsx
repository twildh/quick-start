import React, { ReactElement, useEffect, useState } from "react";

import styles from "./Clock.module.scss";

/**
 * Component which displays the current time
 */
const Clock = (): ReactElement => {
  const [date, setDate] = useState(new Date());

  // actively remove interval when component goes out of scope
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hoursPadded = date.getHours().toString().padStart(2, "0");
  const minutesPadded = date.getMinutes().toString().padStart(2, "0");
  return (
    <div className={styles.clockContainer}>
      <p className={styles.clock}>
        {hoursPadded}:{minutesPadded}
      </p>
    </div>
  );
};

export default Clock;
