import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StripePayment from './StripePayment';

class Header extends Component {
  renderContent(){
    switch(this.props.auth){
      case null:
        return
      case false:
        return <li><a href="/auth/google">Login With Google</a></li>
      default:
        return <>
        <li><StripePayment/></li>
        <li style={{ margin: '0 10px'}}>Credits: {this.props.auth.credits}</li>
        <li><a href="/api/logout">Logout</a></li>
        </>
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={this.props.auth ? '/surveys' : '/'} className="left brand-logo">FeedbackMachine</Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => {
  return { auth: state.auth }
}

export default connect(mapStateToProps)(Header);
