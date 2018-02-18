import React, { Component } from 'react';
import Repo from './Repo';
import Search from './Search';

class App extends React.Component {
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleLanguage =
		this.handleLanguage.bind(this);
		this.state = {
			arrayRepos: [],
			language: " ",
			counter: 0
		};
	}

	componentDidMount(){
		fetch('https://api.github.com/orgs/Adalab/repos')
		.then(response => response.json())
		.then(json =>{
			this.setState({
				arrayRepos: json,
				counter: json.length
			});
		})
	}

	//hace filtro y pinta
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
							descriptionRepo={infoRepo.description? infoRepo.description : 'not description'}
							languageRepo={infoRepo.language}/>
					)
		}
		</div>);
	}

	handleClick(event){
		let valueText = event.target.value;//recogemos el valor introducido del input
		let array = this.state.arrayRepos;//guardamos el array
		//filtra por nombre el array inicial y lo guarda en arrayFiltered
		let arrayFiltered = array.filter(element => element.name.toLowerCase().includes(valueText.toLowerCase())
	);
		//compruebo si hay creado un filtro de lenguaje para si no filtrarlo con el array ya filtrado por texto
		if (this.state.filterLanguage){
			let languageSelected = this.state.filterLanguage;
			let arraySuperFiltered = arrayFiltered.filter(element => element.language.toLowerCase().includes(languageSelected.toLowerCase())
			);
					//modifico estado con el valor del texto introducio y numero de elementos que tiene el array con los dos filtros
					this.setState({
						filterText : valueText,
						counter: arraySuperFiltered.length
					})
		}
		//si no modifico el estado del array filtrado por nombre
		else {
					this.setState({
						filterText : valueText,
						counter: arrayFiltered.length
					})
		}

	}

	handleLanguage(event){
		let theLanguage = event.currentTarget.value;
		let array1 = this.state.arrayRepos;
		let arrayFiltered1 = array1.filter(element => element.language.toLowerCase().includes(theLanguage.toLowerCase())
	);

	if(this.state.filterText){
		let textSelected = this.state.filterText;
		let arraySuperFiltered1 = arrayFiltered1.filter(element => element.name.toLowerCase().includes(textSelected.toLowerCase())
		);
		//modifico estado con el valor del select y numero de elementos que tiene el array con los dos filtros
		this.setState({
			filterLanguage : theLanguage,
			counter: arraySuperFiltered1.length
		})

	}
	//si no modifico el estado del array filtrado por lenguaje
	else{
		this.setState({
			filterLanguage : theLanguage,
			counter: arrayFiltered1.length
		})
	}

	}

  render() {
    return (
      <div className="containerPrincipal">
				<header className="header">
					<h1 className="title">Repos at Adalab in GitHub</h1>
				</header>
				<section className="container">
					<div className="counter">{this.state.counter}</div>
					<Search whenWrite={this.handleClick} whenSelect={this.handleLanguage} />
					{this.drawRepos()}
				</section>
      </div>
    );
  }
}
export default App;
