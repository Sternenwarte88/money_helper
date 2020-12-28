import React from 'react';
import { HeadTitle } from '../../components/UI/headTitle';

class overview extends React.Component {
	render() {
		const incomePageHandler = () => {
			this.props.history.push('/income');
		};
		return (
			<>
				<div>
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

export default overview;
