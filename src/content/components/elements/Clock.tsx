import React, { ReactElement, useState } from "react";

import styles from "./Clock.module.scss";

/**
 * Component which displays the current time
 */
const Clock = (): ReactElement => {
	const [date, setDate] = useState(new Date());

	setInterval(() => {
		setDate(new Date());
	}, 1000);

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
