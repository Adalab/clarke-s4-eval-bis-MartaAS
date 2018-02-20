import React from 'react';
import Repo from './Repo';

class RepoList extends React.Component {
	render(){
		return(
			<ul className="containerRepos">
			{
				this.props.repos.map(
					infoRepo =><li>
					<Repo nameRepo={infoRepo.name}
						linkRepo={infoRepo.html_url}
						descriptionRepo={infoRepo.description? infoRepo.description : 'not description'}
						languageRepo={infoRepo.language}/>
					</li>
					)
				}
			</ul>
		)
	}
}

export default RepoList;
