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

class ManageCategoryCMP extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: [],
      create_name: '',
      create_description: '',
      redirect: '',
      headers: {}
    }
    this.r_createData = this.r_createData.bind(this)
    this.handle = this.handle.bind(this)
  }
  /*ADD DATA *REQUEST* */
  r_createData(e) {
    var data = {
      name: this.state.create_name,
      description: this.state.create_description
    }
    axios.post(BaseUrl + 'api/category', data, {headers: this.state.headers}).then(result => {
      Swal.fire('Success',result.data.message,'success')
    }).catch(e => errorStatusCode(e, this.setState({redirect: '/login'})))
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
  componentDidMount() {
    document.title = 'Manage Category'
    var account = window.localStorage.getItem('account')
    if(account){
      this.setState({
        headers: {Authorization: JSON.parse(account).token}
      })
    }
    $(document).ready(function(){
      $('.tabs').tabs();$('select').formSelect();$('.modal').modal();
    });
    document.querySelectorAll('th').forEach((text, key) => {
      text.addEventListener('click', e => {
        if(e.target.classList.contains('ordered')){
        }
      })
    });
  }
  render() {
    if(this.state.redirect || !window.localStorage.getItem('account')) {
      return this.state.redirect ? <Redirect to={this.state.redirect} />: <Redirect to="/login" />
    }
    return(
      <React.Fragment>
      <BreadCrumb data={[{url: '/', str: window.location.origin}, {url: '/', str: 'Home'}, {url: '/management/category', str: 'Management Category'}]} />
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
                    heading={
                      ['#', 'Name', 'Created']
                    }
                    td={
                      ['id', 'name', 'created_at']
                    }
                    url={{
                      default: BaseUrl + 'api/category',
                      deleted: BaseUrl + 'api/category/',
                      edited: BaseUrl + 'api/category/',
                      search: BaseUrl + 'api/search/category'
                    }}
                    form={
                      ['id', 'name', 'description', 'updated_at']
                    }
                    type={[false,'text', 'textarea', false]}
                    edited={this.e_edited}
                  />
                </div>
                <div id="tabs-create" className="col s12">
                  <div className="row mt-10px">
                    <div className="input-field col s12 m6">
                      <input id="last_name" type="text" className="validate" name="create_name" onKeyUp={this.handle}/>
                      <label htmlFor="last_name">Name</label>
                    </div>
                    <div className="input-field col s12 m6">
                      <textarea className="materialize-textarea" placeholder="Description" name="create_description" onKeyUp={this.handle}></textarea>
                    </div>
                    <div className="col s12">
                      <button className="btn waves-effect waves-light blue" onClick={this.r_createData}>Submit<i className="material-icons right">send</i></button>
                    </div>
                  </div>
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
export default ManageCategoryCMP;