import React from 'react';
import classes from './banner.module.css';

const Banner = () => {
	return (
		<div className={classes.banner}>
			<div className={classes.banner_box}>
				<p className={classes.banner_text}>Pre Alpha v 0.1</p>
			</div>
		</div>
	);
};

export default Banner;
