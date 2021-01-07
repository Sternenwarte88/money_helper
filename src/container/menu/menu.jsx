import React from 'react';
import { HeadTitle } from '../../components/UI/headTitle';
import classes from './menu.module.css';
import { connect } from 'react-redux';

// TODO: Make overview and bills functional
// TODO: Display a little overview of 3 items from each income and bills
// TODO: Style everything

class overview extends React.Component {
	render() {
		const incomePageHandler = () => {
			this.props.history.push('/income');
		};
		return (
			<>
				<div className={classes.head}>
					<HeadTitle site={'Menü'} />
				</div>
				<div>
					<button>Übersicht</button>
					<button onClick={incomePageHandler}>Einnahmen</button>
					<button>Ausgaben</button>
				</div>
				<div>Tabellenspalte</div>
			</>
		);
	}
}

const mapStateToProp = (state, ownProps) => {
	return {
		loggedIn: state.loggedIn,
	};
};

export default connect(mapStateToProp)(overview);
