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

class VerifiedCodeCMP extends React.Component{
  static contextType = ContextDATA;
  constructor(props){
    super(props)
    this.state = {
        code: '',
        successLogin: false,
        redirect: ''
    }
    this.actionSubmit = this.actionSubmit.bind(this)
    this.handle = this.handle.bind(this)
  }
  componentDidMount(){
    document.title = 'Verification Code | Go Blog'
  }
  actionSubmit(e){
    this.setState({process: true})
    e.preventDefault();
    axios.get(`${BaseUrl}api/verified-email?code=${this.state.code}`).then(result => {
      this.setState({process: false})
      M.toast({html: result.data.message})
      this.setState({redirect: '/login'})
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
              <h6>Verification Account</h6>
              <form onSubmit={this.actionSubmit}>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">vpn_key</i>
                    <input autoComplete="false" disabled={this.state.process ? true:false} name="code" id="icon_telephone" type="text" className="validate" value={this.state.code} onChange={this.handle} />
                    <label htmlFor="icon_telephone" className={this.state.process || this.state.code.length >= 1 ? 'active':''}>Code</label>
                  </div>
                  <div className="col s12 left-align">
                    <button disabled={this.state.process ? true:false} type="submit" className="btn waves-effect waves-light w-100 blue">Check Verification</button>
                    <p style={{marginTop:25}}><Link to="/reset">Reset Code</Link></p>
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

export default VerifiedCodeCMP;