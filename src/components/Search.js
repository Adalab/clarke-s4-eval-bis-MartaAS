import React from 'react';

export class Search extends React.Component {
	render(){
		return(
			<div>
			<input className="" type="text" placeholder="Encuentra" onChange={this.props.whenWrite}>
			</input>

			<select  onChange={this.props.whenSelect}>
				<option value="">Select</option>
				<option value="HTML">HTML</option>
				<option value="CSS">CSS</option>
				<option value="JavaScript">JavaScript</option>
			</select>
		</div>
		)
	}
}

export default Search;
