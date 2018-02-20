import React, { Component } from 'react';
import Repo from './Repo';
import Search from './Search';
import RepoList from './RepoList';

export default class App extends React.Component {
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleLanguage =
		this.handleLanguage.bind(this);
		this.state = {
			arrayRepos: [],
			filterText: '',
			filterLanguage: ''
		};
	}

	componentDidMount(){
		fetch('https://api.github.com/orgs/Adalab/repos')
		.then(response => response.json())
		.then(json =>{
			this.setState({
				arrayRepos: json
			});
		})
	}

	//hace filtro y pinta
	drawRepos() {
		let allRepos = this.state.arrayRepos;

			allRepos = allRepos.filter(element => element.language.includes(this.state.filterLanguage)
		);
			allRepos = allRepos.filter(element => element.name.toLowerCase().includes(this.state.filterText.toLowerCase())
		);



		return(

			<section className="container">
				<div className="counter">{allRepos.length}</div>
				<Search whenWrite={this.handleClick} whenSelect={this.handleLanguage} />
				<RepoList repos={allRepos}/>
		</section>);
}

	handleClick(event){
		const valueText = event.target.value;//recogemos el valor introducido del input

				this.setState({
					filterText : valueText
				})
}

	handleLanguage(event){
		const theLanguage = event.currentTarget.value;

				this.setState({
					filterLanguage : theLanguage
				})
}

	render() {
		return (
			<div className="containerPrincipal">
				<header className="header">
					<h1 className="title">Repos at Adalab in GitHub</h1>
				</header>
					{this.drawRepos()}
			</div>
		);
	}
	}
// export default App;
