import React from 'react'
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

class ContactUSCMP extends React.Component {
  state = {
    name: '',
    email: '',
    description: '',
    className: '',
    classEmail: ''
  }
  constructor(props){
    super(props)
    this.handle = this.handle.bind(this)
  }
  componentDidMount(){
    document.title = 'Contact US'
    $('.parallax').parallax();
    if(JSON.parse(window.localStorage.getItem('account'))){
      this.setState({
        name: JSON.parse(window.localStorage.getItem('account')).data.name,
        email: JSON.parse(window.localStorage.getItem('account')).data.email,
        className: 'active',
        classEmail: 'active'
      })
    }
  }
  handle(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  render(){
    return(
      <div className="parallax-container custom">
        <div className="parallax">
          <img src="https://images.unsplash.com/photo-1606044466411-207a9a49711f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHw%3D&auto=format&fit=crop&w=600&q=60"/>
        </div>
        <div className="row">
          <div className="col s12 m4 offset-m4">
            <div className="card-panel">
              <h5 className="center-align">Contact US</h5>
              <p className="center-align">If you have questions or just want to get in touch, use the form below. We look forward to hearing from you!</p>
              <form>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">account_circle</i>
                    <input id="icon_prefix" value={this.state.name} onChange={this.handle} name="name" type="text" className="validate"/>
                    <label className={this.state.className} htmlFor="icon_prefix">Name</label>
                  </div>
                  <div className="input-field col s12">
                    <i className="material-icons prefix">email</i>
                    <input id="icon_telephone" value={this.state.email} onChange={this.handle} name="email" type="email" className="validate"/>
                    <label className={this.state.classEmail} htmlFor="icon_telephone">Email</label>
                  </div>
                  <div className="input-field col s12">
                    <i className="material-icons prefix">description</i>
                    <textarea id="icon_prefix2" value={this.state.description} onChange={this.handle} name="description" className="materialize-textarea"></textarea>
                    <label htmlFor="icon_prefix2">Description</label>
                  </div>
                </div>
                <div className="center-align">
                  <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                    <i className="material-icons right">send</i>
                  </button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default ContactUSCMP;