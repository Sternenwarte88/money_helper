import trash from '../../img/icons/trash-alt-regular.svg';
import classes from './reveneuTable.module.css';

const reveneuTableDisplay = props => {
	let trashCan;

	if (props.clicked) {
		trashCan = (
			<div className={classes.trashCan}>
				<img src={trash} alt='' onClick={props.clicked} />
			</div>
		);
	}

	return (
		<>
			<div className={classes.reason}>{props.reason}</div>
			<div className={classes.amount}>{props.amount}€</div>
			<div className={classes.date}>{props.date}</div>
			{trashCan}
		</>
	);
};

export default reveneuTableDisplay;
