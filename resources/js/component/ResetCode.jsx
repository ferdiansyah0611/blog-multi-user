import React from 'react';
import ReactDOM from 'react-dom'
import {
  Link,
  Redirect,
} from "react-router-dom";
import axios from 'axios';
/*tools*/
import BaseUrl from '../tools/Base';
import errorStatusCode from '../tools/errorStatusCode';
/*context*/
import ContextDATA from '../ContextDATA';

class ResetCodeCMP extends React.Component{
  static contextType = ContextDATA;
  constructor(props){
    super(props)
    this.state = {
        email: '',
        successLogin: false,
        redirect: ''
    }
    this.actionSubmit = this.actionSubmit.bind(this)
    this.handle = this.handle.bind(this)
  }
  componentDidMount(){
    document.title = 'Reset Code | Go Blog'
  }
  actionSubmit(e){
    this.setState({process: true})
    e.preventDefault();
    axios.get(`${BaseUrl}api/reset-code?email=${this.state.email}`).then(result => {
      this.setState({process: false})
      M.toast({html: result.data.message})
      this.setState({redirect: '/verification'})
    }).catch(e => {
      this.setState({process: false})
      M.toast({html: e.response.data.message, classes: 'red'})
    })
  }
  handle(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  render() {
    if (this.state.redirect || this.context.users.id) {
      return this.state.redirect ? <Redirect to={this.state.redirect} />: <Redirect to="/" />
    }
    return(
      <React.Fragment>
      <div className="row">
        <div className="col s12 m8 offset-m2 l6 offset-l3">
          <div className="card">
            <div className="card-content">
            {
              this.state.process ? <div className="progress"><div className="indeterminate"></div></div>:''
            }
            <h6>Reset Verification Code</h6>
            <form onSubmit={this.actionSubmit}>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">email</i>
                  <input disabled={this.state.process ? true:false} name="email" id="icon_telephone" type="email" className="validate" value={this.state.email} onChange={this.handle} />
                  <label className={this.state.process || this.state.email.length >= 1 ? 'active':''}>Email</label>
                </div>
                <div className="col s12 left-align">
                  <button disabled={this.state.process ? true:false} type="submit" className="btn waves-effect waves-light w-100 blue">Reset</button>
                  <div className="divider"/>
                  <p>Have a account ? <Link to="/login">Login Now</Link></p>
                </div>
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>
      </React.Fragment>
     )
  }
}

export default ResetCodeCMP;