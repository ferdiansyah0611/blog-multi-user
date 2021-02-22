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

class LoginCMP extends React.Component{
  static contextType = ContextDATA;
  constructor(props){
    super(props)
    this.state = {
        email: '',
        password: '',
        successLogin: false,
        redirect: ''
    }
    this.actionLogin = this.actionLogin.bind(this)
    this.handle = this.handle.bind(this)
  }
  componentDidMount(){
    document.title = 'Login | Go Blog'
    $('input.counter').characterCounter();
  }
  actionLogin(e){
    this.setState({process: true})
    e.preventDefault();
    axios.post(`${BaseUrl}api/login`, this.state).then(result => {
      if(result.data.status == 200){
        window.localStorage.setItem('account', JSON.stringify(result.data))
        this.setState({successLogin: true})
        setTimeout(() => {
          M.toast({html: result.data.message})
          this.context.getMount()
          this.setState({redirect: '/'})
        }, 10000)
      }
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
          <div className="card" style={this.state.successLogin ? {marginBottom: 250}: {}}>
            <div className="card-content">
            {
              this.state.process ? <div className="progress"><div className="indeterminate"></div></div>:''
            }
            {
              this.state.successLogin ? <p className="center-align mt-10px">Please Wait A Moment...</p>:
              <React.Fragment>
                <h6>Login Account</h6>
                <form onSubmit={this.actionLogin}>
                  <div className="row">
                    <div className="input-field col s12">
                      <i className="material-icons prefix">email</i>
                      <input disabled={this.state.process ? true:false} name="email" id="icon_prefix" type="email" className="validate counter" value={this.state.email} onChange={this.handle} data-length="50" />
                      <label htmlFor="icon_prefix" className={this.state.process  || this.state.email.length >= 1 ? 'active':''}>Email</label>
                      <span className="helper-text" data-error="Invalid Email" data-success="OK">* Required</span>
                    </div>
                    <div className="input-field col s12">
                      <i className="material-icons prefix">vpn_key</i>
                      <input disabled={this.state.process ? true:false} name="password" id="icon_telephone" type="password" className="validate counter" value={this.state.password} onChange={this.handle} data-length="20" />
                      <label htmlFor="icon_telephone" className={this.state.process || this.state.password.length >= 1 ? 'active':''}>Password</label>
                      <span className="helper-text" data-error="Invalid Password" data-success="OK">* Required</span>
                    </div>
                    <div className="col s12 left-align">
                      <button disabled={this.state.process ? true:false} type="submit" className="btn waves-effect waves-light w-100 blue">Login</button>
                      <p style={{marginTop:25}}><Link to="/reset">Reset Password</Link><Link className="ml-10px" to="/verification">Verification Code</Link></p>
                      <div className="divider"/>
                      <p>Don't have a account ? <Link to="/register">Create Now</Link></p>
                    </div>
                  </div>
                </form>
              </React.Fragment>
            }
            </div>
          </div>
        </div>
      </div>
      </React.Fragment>
     )
  }
}

export default LoginCMP;