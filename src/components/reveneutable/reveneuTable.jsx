import trash from '../../img/icons/trash-alt-regular.svg';
import classes from './reveneuTable.module.css';

const reveneuTableDisplay = props => {
	return (
		<>
			<div className={classes.reason}>{props.reason}</div>
			<div className={classes.amount}>{props.amount}€</div>
			<div className={classes.date}>{props.date}</div>
			<div className={classes.trash}>
				<img src={trash} alt='' onClick={props.clicked} />
			</div>
		</>
	);
};

export default reveneuTableDisplay;
