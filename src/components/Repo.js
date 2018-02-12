import React from 'react';

class Repo extends React.Component {
	render(){
		return(
			<div className="cardInfoRepo">
				<h2><a href={this.props.linkRepo} target="_blank">{this.props.nameRepo}</a></h2>
				<p>{this.props.descriptionRepo}</p>
				<div className={`language language--${this.props.languageRepo}`}></div>
			</div>
		)
	}
}

export default Repo;
