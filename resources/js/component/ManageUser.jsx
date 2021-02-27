import React from 'react';
import {
  Link,
  Redirect,
} from "react-router-dom";
import axios from 'axios';
import BreadCrumb from './tools/BreadCrumb.jsx'
import Datatables from './tools/Datatables.jsx';
/*tools*/
import BaseUrl from '../tools/Base';
import errorStatusCode from '../tools/errorStatusCode';
import print from '../tools/print';
/*context*/
import ContextDATA from '../ContextDATA';

class ManageUserCMP extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: [],

      name: '',
      email: '',
      password: '',
      location: '',
      gender: 'male',
      born: '',
      avatar: {},

      redirect: '',
      headers: {}
    }
    this.r_createData = this.r_createData.bind(this)
    this.handle = this.handle.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
  }
  /*ADD DATA *REQUEST* */
  r_createData(e) {
    e.preventDefault()
    let formData = new FormData()
    formData.append('name', this.state.name)
    formData.append('email', this.state.email)
    formData.append('password', this.state.password)
    formData.append('location', this.state.location)
    formData.append('gender', this.state.gender)
    formData.append('born', this.state.born)
    formData.append('avatar', this.state.avatar)
    axios.post(BaseUrl + 'api/user', formData).then(result => {
      Swal.fire('Success',result.data.message,'success')
    }).catch(e => {
      M.toast({html: e.response.data.message, classes: 'red'})
    })
  }
  /*HANDLING FORM*/
  handle(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  onFileChange(event) { 
    this.setState({ avatar: event.target.files[0] }); 
  }
  componentDidMount() {
    document.title = 'Manage User | Go Blog'
    $('.tabs').tabs();
    $('input.len').characterCounter();
    $('.datepicker').datepicker();
    $('select').formSelect();
  }
  render() {
    if(this.state.redirect || !window.localStorage.getItem('account')) {
      return this.state.redirect ? <Redirect to={this.state.redirect} />: <Redirect to="/login" />
    }
    return(
      <React.Fragment>
      <BreadCrumb data={[{url: '/management/category', str: 'Management Category'}]} />
      <div className="row">
        <div className="col s12">
          <div className="card-panel">
            <div className="card-content">
              <ul id="tabs-swipe-demo" className="tabs">
                <li className="tab col s6"><a className="active" href="#tabs-data">Data</a></li>
                <li className="tab col s6"><a href="#tabs-create">Create</a></li>
              </ul>
              <div className="row">
                <div id="tabs-data" className="col s12">
                  <Datatables
                    editable={true}
                    paginate={true}
                    heading={
                      ['#', 'Name', 'Email', 'Created']
                    }
                    td={
                      ['id', 'name', 'email', 'created_at']
                    }
                    url={{
                      default: BaseUrl + 'api/user',
                      deleted: BaseUrl + 'api/user/',
                      edited: BaseUrl + 'api/user/',
                      search: BaseUrl + 'api/search/user'
                    }}
                    form={
                      ['id', 'name', 'email', 'born', 'gender', 'location', 'updated_at']
                    }
                    type={[false,'text', 'email', 'text', 'select|gender,female', 'select|location', false]}
                    edited={this.e_edited}
                  />
                </div>
                <div id="tabs-create" className="col s12">
                  <form className="row mt-10px" onSubmit={this.r_createData}>
                    <div className="input-field col s12 m6">
                      <i className="material-icons prefix">account_circle</i>
                      <input name="name" type="text" className="validate len" onKeyUp={this.handle} data-length="10" />
                      <label>Name</label>
                      <span className="helper-text" data-error="Invalid Name" data-success="OK">* Required</span>
                    </div>
                    <div className="input-field col s12 m6">
                      <i className="material-icons prefix">email</i>
                      <input name="email" type="email" className="validate len" onKeyUp={this.handle} data-length="50" />
                      <label>Email</label>
                      <span className="helper-text" data-error="Invalid Email" data-success="OK">* Required</span>
                    </div>
                    <div className="input-field col s12">
                      <i className="material-icons prefix">vpn_key</i>
                      <input name="password" type="password" className="validate len" onKeyUp={this.handle} data-length="20" />
                      <label>Password</label>
                      <span className="helper-text" data-error="Invalid Password" data-success="OK">* Required</span>
                    </div>
                    <div className="input-field col s12 m6">
                      <i className="material-icons prefix">account_circle</i>
                      <label className="active">Gender</label>
                      <select name="gender" defaultValue={this.state.gender} onChange={this.handle}>
                        <option value="" disabled={true}>Choose your option</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div className="input-field col s12 m6">
                      <ContextDATA.Consumer>
                        {
                          result => (
                            <React.Fragment>
                              <i className="material-icons prefix">account_circle</i>
                              <label className="active">Location</label>
                              <select name="location" defaultValue="Choose your option" onChange={this.handle}>
                                <option value="" disabled={true}>Choose your location</option>
                                {
                                  result.locationAPI.map((data, key) => {
                                    return(<option key={key} value={data.name}>{data.name}</option>)
                                  })
                                }
                              </select>
                            </React.Fragment>
                          )
                        }
                      </ContextDATA.Consumer>
                    </div>
                    <div className="input-field col s12">
                      <i className="material-icons prefix">event</i>
                      <input autoComplete="off" type="text" name="born" className="datepicker"/>
                      <label className="active">Born</label>
                    </div>
                    <div className="file-field input-field col s12">
                      <div className="btn blue">
                        <span>Avatar</span>
                        <input name="avatar" onChange={this.onFileChange} type="file"/>
                      </div>
                      <div className="file-path-wrapper">
                        <input className="file-path validate" accept=".jpg,.png" type="text"/>
                      </div>
                    </div>
                    <div className="col s12">
                      <button className="btn waves-effect waves-light blue mt-10px" onClick={this.r_createData}>Submit<i className="material-icons right">send</i></button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </React.Fragment>
    )
  }
}
export default ManageUserCMP;