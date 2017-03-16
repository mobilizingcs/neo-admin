import React from 'react';
import { Link } from 'react-router';

import ClassList from './ClassList';

import { Chip, Button, Icon } from 'react-mdl';

class Class extends React.Component {

	constructor( props ) {
		super( props );
	}

	render( ) {
		return (
			<div style={{margin:'50px'}}>
				<div className="mdl-grid">
					<div className="mdl-cell mdl-cell--4-col">
						<Chip>Classes</Chip>
					</div>
					<div className="mdl-cell mdl-cell--4-col">
						<Link to="/classes/class/new">
							<Button raised colored ripple>							
								<Icon name="add" /> New Class							
							</Button>
						</Link>
					</div>
				</div>
				<ClassList />
			</div>
		);
	}

}

export default Class;