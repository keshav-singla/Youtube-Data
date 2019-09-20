import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Search from './components/search';
import Searchlist from './components/searchList';
import Video from './components/video';
import { read } from 'fs';

class App extends React.Component{
  constructor(){
    super()
    this.state={

    }
  }

  componentDidMount(){
    
  }

  render(){
    return (
      <div className="App">
       
       <Router>
         <Route exact path="/" component={Search}/>
         <Route exact path="/serach-query?:id" component={Searchlist}/>
         <Route exact path="/watch?v=" component={Video}/>
       </Router>
      </div>
    );
  }
}

export default App;
