import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Landing from './Landing';
import Header from './Header';
import Dashboard from './Dashboard'
import SurveyNew from './surveys/SurveyNew';

class App extends React.Component {
  componentDidMount(){
    this.props.fetchUser();
  }

  render(){
    return (
      
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact path='/' component={Landing}></Route>
            <Route exact path='/surveys' component={Dashboard}></Route>
            <Route path='/surveys/new' component={SurveyNew}></Route>
          </div>
        </BrowserRouter>
      
    )
  }
}

export default connect(null, actions)(App); //actions creators are passed to App as props
