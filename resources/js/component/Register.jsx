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

class RegisterCMP extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      location: '',
      gender: 'male',
      born: '',
      avatar: '',
      locationAPI: [],
      redirect: ''
    }
    this.handle = this.handle.bind(this)
    this.addAccount = this.addAccount.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
  }
  addAccount(e){
    e.preventDefault()
    var formData = new FormData()
    Object.getOwnPropertyNames(this.state).forEach((name) => {
      formData.append(name, this.state[name])
    })
    axios.post(`${BaseUrl}api/register`, formData).then(result => {
      this.setState({redirect: '/login'});
    })
  }
  onFileChange(event) { 
    this.setState({ avatar: event.target.files[0] }); 
  };
  componentDidMount(){
    document.title = 'Register'
    if(window.localStorage.getItem('locationCountry')){
      this.setState({locationAPI: JSON.parse(window.localStorage.getItem('locationCountry'))})
    }else{
      axios.get('https://restcountries.eu/rest/v2/all').then(result => {
        this.setState({locationAPI: result.data})
        window.localStorage.setItem('locationCountry', JSON.stringify(result.data))
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
    if(this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return(
      <React.Fragment>
      <div className="row">
        <div className="col s12 m6 offset-m3 l4 offset-l4">
          <div className="card">
            <div className="card-content">
              <p>Register Account</p>
              <form onSubmit={this.addAccount}>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">account_circle</i>
                    <input name="name" id="icon_prefix" type="text" className="validate" onKeyUp={this.handle} />
                    <label htmlFor="icon_prefix">Name</label>
                  </div>
                  <div className="input-field col s12">
                    <i className="material-icons prefix">email</i>
                    <input name="email" id="icon_prefix" type="email" className="validate" onKeyUp={this.handle} />
                    <label htmlFor="icon_prefix">Email</label>
                  </div>
                  <div className="input-field col s12">
                    <i className="material-icons prefix">vpn_key</i>
                    <input name="password" id="icon_telephone" type="password" className="validate" onKeyUp={this.handle} />
                    <label htmlFor="icon_telephone">Password</label>
                  </div>
                  <div className="input-field col s12">
                    <select className="browser-default" name="gender" defaultValue={this.state.gender} onChange={this.handle}>
                      <option value="" disabled={true}>Choose your option</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    <label className="active">Gender</label>
                  </div>
                  <div className="input-field col s12">
                    <select className="browser-default" name="location" defaultValue="Choose your option" onChange={this.handle}>
                      <option value="" disabled={true}>Choose your location</option>
                      {
                        this.state.locationAPI.map((data, key) => {
                          return(<option key={key} value={data.name}>{data.name}</option>)
                        })
                      }
                    </select>
                    <label className="active">Location</label>
                  </div>
                  <div className="input-field col s12">
                    <i className="material-icons prefix">date_range</i>
                    <input type="date" name="born" className="datepicker" onKeyUp={this.handle}/>
                    <label className="active">Born</label>
                  </div>
                  <div className="file-field input-field col s12">
                    <div className="btn">
                      <span>Avatar</span>
                      <input name="avatar" onChange={this.onFileChange} type="file"/>
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" type="text"/>
                    </div>
                  </div>
                  <div className="col s12">
                    <button type="submit" className="btn waves-effect waves-light w-100">Register</button>
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

export default RegisterCMP;