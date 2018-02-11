import React from 'react';

class Repo extends React.Component {
	render(){
		return(
			<div className="cardInfoRepo">
				<h2><a href={this.props.linkRepo} target="_blank">{this.props.nameRepo}</a></h2>
				<p>{this.props.descriptionRepo}</p>
				<span className={`language language--${this.props.languageRepo}`}>{this.props.languageRepo}</span>
			</div>
		)
	}
}

export default Repo;
