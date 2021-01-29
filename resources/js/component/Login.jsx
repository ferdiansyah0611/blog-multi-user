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
        redirect: ''
    }
    this.actionLogin = this.actionLogin.bind(this)
    this.handle = this.handle.bind(this)
  }
  componentDidMount(){
    document.title = 'Login | Go Blog'
    $('input').characterCounter();
  }
  actionLogin(e){
    this.setState({process: true})
    e.preventDefault();
    axios.post(`${BaseUrl}api/login`, this.state).then(result => {
      if(result.data.status == 200){
        window.localStorage.setItem('account', JSON.stringify(result.data))
        setTimeout(() => {
          M.toast({html: result.data.message})
          if(result.data.data.type == 5 && result.data.data.role == 'admin'){
            this.context.setState({name: 'menu_manage', value:  ['Article', 'Comment', 'Storage', 'Category']})
            this.context.setState({name: 'menu_preferences', value: [
              {txt:'Account',icon:'account_box',url: '/prefferences/account'}
            ]})
          }else{
            this.context.setState({name: 'menu_manage', value:  ['Article', 'Storage']})
            this.context.setState({name: 'menu_preferences', value: [
              {txt:'Account',icon:'account_box',url: '/prefferences/account'}
            ]})
          }
          this.context.getNotification(result.data.token)
          this.context.setState({name: 'users', value: result.data.data})
          this.setState({redirect: '/'})
        }, 10000)
      }
    }).catch(e => {
      this.setState({process: false})
      if(e.response.status === 403 || e.response.status === 401){
        M.toast({html: e.response.data.message, classes: 'red'})
      }
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
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
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
              <h6>Login Account</h6>
              <form onSubmit={this.actionLogin}>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">email</i>
                    <input name="email" id="icon_prefix" type="email" className="validate" value={this.state.email} onChange={this.handle} data-length="50" />
                    <label htmlFor="icon_prefix">Email</label>
                    <span className="helper-text" data-error="Invalid Email" data-success="OK">* Required</span>
                  </div>
                  <div className="input-field col s12">
                    <i className="material-icons prefix">vpn_key</i>
                    <input name="password" id="icon_telephone" type="password" className="validate" value={this.state.password} onChange={this.handle} data-length="20" />
                    <label htmlFor="icon_telephone">Password</label>
                    <span className="helper-text" data-error="Invalid Password" data-success="OK">* Required</span>
                  </div>
                  <div className="col s12 center-align">
                    <button type="submit" className="btn waves-effect waves-light w-100 blue">Login</button>
                    <h6>OR</h6>
                    <Link to="/register" className="btn waves-effect waves-light w-100 blue lighten-1">Register</Link>
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

export default LoginCMP;