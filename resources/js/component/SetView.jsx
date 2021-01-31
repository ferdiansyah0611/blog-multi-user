import React from 'react';
import {
  Link,
  Redirect,
} from "react-router-dom";
import axios from 'axios';
import BreadCrumb from './tools/BreadCrumb.jsx';
/*tools*/
import BaseUrl from '../tools/Base';
import errorStatusCode from '../tools/errorStatusCode';
import print from '../tools/print';
/*context*/
import ContextDATA from '../ContextDATA';

class SetViewCMP extends React.Component {
  static contextType = ContextDATA;
  constructor(props){
    super(props)
    this.state = {}
    this.handle = this.handle.bind(this)
    this.setUI = this.setUI.bind(this)
  }
  /*HANDLING FORM*/
  handle(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState(prevState => {
      var users = Object.assign({}, prevState.users)
      users[name] = value
      return {users}
    })
  }
  setUI(event){
    this.context.setState({
      name: 'ui',
      value: event.target.dataset.navbar ? {
        navbar: {
          bg: event.target.dataset.navbar,
          txt: event.target.dataset.text
        },
        sidebar: this.context.ui.sidebar
      }: {
        navbar: this.context.ui.navbar,
        sidebar: event.target.dataset.sidebar
      }
    })
  }
  componentDidMount(){
    document.title = 'Setting View | Go Blog'
    $('.tabs').tabs();
  }
  render(){
    if(this.state.redirect || !window.localStorage.getItem('account')) {
      return this.state.redirect ? <Redirect to={this.state.redirect} />: <Redirect to="/login" />
    }
    return(
      <React.Fragment>
        <BreadCrumb data={[{url: '/setting/view', str: 'Setting view'}]} />
        <div className="container">
        <div className="card-panel">
          <form className="row">
            <ContextDATA.Consumer>
              {
                context => (
                  <React.Fragment>
                  <div className="col s12">
                    <h5>Custom Pages UI</h5>
                    <div className="divider"/>
                    <div class="row">
                      <div class="col s12">
                        <ul class="tabs">
                          <li class="tab col s4"><a class="active" href="#navbar-tabs">Navbar</a></li>
                          <li class="tab col s4"><a href="#sidebar-tabs">Sidebar</a></li>
                          <li class="tab col s4"><a href="#profile-tabs">Profile</a></li>
                        </ul>
                      </div>
                      <div id="navbar-tabs" class="col s12 center-align">
                        <p>Auto Generate Text & Background Color</p>
                        <button onClick={this.setUI} data-text="white-text" data-navbar="blue darken-1" className="btn waves-effect waves-light blue darken-1">Default</button>
                        <button onClick={this.setUI} data-text="white-text" data-navbar="red" className="btn waves-effect waves-light red">Red</button>
                        <button onClick={this.setUI} data-text="white-text" data-navbar="pink" className="btn waves-effect waves-light pink">pink</button>
                        <button onClick={this.setUI} data-text="white-text" data-navbar="purple" className="btn waves-effect waves-light purple">purple</button>
                        <button onClick={this.setUI} data-text="white-text" data-navbar="deep-purple" className="btn waves-effect waves-light deep-purple">deep-purple</button>
                        <button onClick={this.setUI} data-text="white-text" data-navbar="indigo" className="btn waves-effect waves-light indigo">indigo</button>
                        <button onClick={this.setUI} data-text="white-text" data-navbar="blue" className="btn waves-effect waves-light blue">blue</button>
                        <button onClick={this.setUI} data-text="white-text" data-navbar="light-blue" className="btn waves-effect waves-light light-blue">light-blue</button>
                        <button onClick={this.setUI} data-text="white-text" data-navbar="cyan" className="btn waves-effect waves-light cyan">cyan</button>
                        <button onClick={this.setUI} data-text="white-text" data-navbar="teal" className="btn waves-effect waves-light teal">teal</button>
                        <button onClick={this.setUI} data-text="white-text" data-navbar="green" className="btn waves-effect waves-light green">Green</button>
                        <button onClick={this.setUI} data-text="white-text" data-navbar="light-green" className="btn waves-effect waves-light light-green">light-green</button>
                        <button onClick={this.setUI} data-text="white-text" data-navbar="lime" className="btn waves-effect waves-light lime">lime</button>
                        <button onClick={this.setUI} data-text="white-text" data-navbar="yellow" className="btn waves-effect waves-light yellow">yellow</button>
                        <button onClick={this.setUI} data-text="white-text" data-navbar="amber" className="btn waves-effect waves-light amber">amber</button>
                        <button onClick={this.setUI} data-text="white-text" data-navbar="orange" className="btn waves-effect waves-light orange">orange</button>
                        <button onClick={this.setUI} data-text="white-text" data-navbar="deep-orange" className="btn waves-effect waves-light deep-orange">deep-orange</button>
                        <button onClick={this.setUI} data-text="white-text" data-navbar="brown" className="btn waves-effect waves-light brown">brown</button>
                        <button onClick={this.setUI} data-text="white-text" data-navbar="grey" className="btn waves-effect waves-light grey">grey</button>
                        <button onClick={this.setUI} data-text="white-text" data-navbar="blue-grey" className="btn waves-effect waves-light blue-grey">blue-grey</button>
                        <button className="btn waves-effect waves-light blue darken-2 mt-10px">
                          <i className="material-icons right">send</i>
                          Save Changes
                        </button>
                      </div>
                      <div id="sidebar-tabs" class="col s12">
                        Sidebar
                      </div>
                      <div id="profile-tabs" class="col s12">
                        Profile
                      </div>
                    </div>
                  </div>
                  </React.Fragment>
                )
              }
            </ContextDATA.Consumer>
            
          </form>
        </div>
        </div>
      </React.Fragment>
    )
  }
}
export default SetViewCMP;