const reveneuTableDisplay = props => {
	return (
		<>
			<div>{props.amount}€</div>
			<div>{props.reason}</div>
			<div>{props.date}</div>
		</>
	);
};

export default reveneuTableDisplay;
