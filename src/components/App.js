import React, { Component } from 'react';
import Repo from './Repo';
import Search from './Search';

class App extends React.Component {
  render() {
    return (
      <div className="container">
				<header className="header">
					<h1 className="title">Repos at Adalab in GitHub</h1>
				</header>
      </div>
    );
  }
}
export default App;
