import accountBtn from '../../img/icons/user-cog-solid.svg';
import backBtn from '../../img/icons/arrow-alt-circle-left-solid.svg';
import classes from './layout.module.css';
import { withRouter } from 'react-router';
const Layout = props => {
	return (
		<>
			<div className={classes.header}>
				<img
					onClick={props.history.goBack}
					className={classes.backBtn}
					src={backBtn}
					alt='back-button'
				/>
				<img
					className={classes.accountBtn}
					src={accountBtn}
					alt='accountBtn-button'
				/>
			</div>
			<div>{props.children}</div>
		</>
	);
};

export default withRouter(Layout);
