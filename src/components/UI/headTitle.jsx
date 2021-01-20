import classes from './headTitle.module.css';

export const HeadTitle = props => {
	return (
		<div className={classes.headTitle}>
			<h1>Money Helper</h1>
			<h2>Wilkommen zu deinem persönlichen Finanzgehilfen</h2>
			<h2>{props.site}</h2>
		</div>
	);
};
