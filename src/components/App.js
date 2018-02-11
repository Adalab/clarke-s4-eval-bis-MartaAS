import React, { Component } from 'react';
import Repo from './Repo';
import Search from './Search';

class App extends React.Component {
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleLanguage = this.handleLanguage.bind(this);
		this.state = {
			arrayRepos: [],
			language : " "
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

	drawRepos() {
		let allRepos = this.state.arrayRepos;
		if(this.state.filterLanguage && this.state.filterText){
			allRepos = allRepos.filter(element => element.language.includes(this.state.filterLanguage)
				);
			allRepos = allRepos.filter(element => element.name.toLowerCase().includes(this.state.filterText.toLowerCase())
				);
		}
		else if(this.state.filterLanguage){
			allRepos = allRepos.filter(element => element.language.includes(this.state.filterLanguage)
				);
			}
		else if(this.state.filterText){
				allRepos = allRepos.filter(element => element.name.toLowerCase().includes(this.state.filterText.toLowerCase())
				);
			}

		return(<div className="containerRepos">
			{
				allRepos.map(
					infoRepo =>
						<Repo nameRepo={infoRepo.name}
							linkRepo={infoRepo.html_url}
							descriptionRepo={infoRepo.description}
							languageRepo={infoRepo.language}/>
					)
		}
		</div>);
	}

	handleClick(event){
		this.setState({filterText : event.target.value})
	}

	handleLanguage(event){
		let theLanguage = event.currentTarget.value;
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
				<section className="container">
					<Search whenWrite={this.handleClick} whenSelect={this.handleLanguage} />
					{this.drawRepos()}
				</section>
      </div>
    );
  }
}
export default App;
