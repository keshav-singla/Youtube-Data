import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Search from './components/search';
import Searchlist from './components/searchList';
import Video from './components/video';
class App extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <div >
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Search} />
            <Route
              path='/results/serach-query:id'
              render={(props) => <Searchlist {...props} isAuthed={true} />}
            />
            <Route
              path="/watch?=:id"
              render={({ props }) => <Video {...props} isAuthed={true} />}
            />
          </Switch>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
