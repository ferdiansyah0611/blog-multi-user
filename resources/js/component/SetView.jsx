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
    this.state = {
      'headers': {},
      'sidebar-cover': '',
      'profil-cover': ''
    }
    this.handle = this.handle.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
    this.setUI = this.setUI.bind(this)
    this.setFooter = this.setFooter.bind(this)
    this.saveUi = this.saveUi.bind(this)
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
  onFileChange(event) {
    this.context.setState({
      name: 'ui',
      value: {
        id: this.context.ui.id,
        navbar: this.context.ui.navbar,
        sidebar: {
          bg: this.context.ui.sidebar.bg,
          txt: this.context.ui.sidebar.txt,
          cover: URL.createObjectURL(event.target.files[0])
        },
        footer: this.context.ui.footer,
      }
    })
    this.setState({ [event.target.name]: event.target.files[0] });
  };
  setUI(event){
    if(event.target.dataset.navbar || event.target.dataset.sidebar){
      this.context.setState({
        name: 'ui',
        value: event.target.dataset.navbar ? {
          id: this.context.ui.id,
          navbar: {
            bg: event.target.dataset.navbar,
            txt: event.target.dataset.text
          },
          sidebar: this.context.ui.sidebar,
          footer: this.context.ui.footer
        }: {
          id: this.context.ui.id,
          navbar: this.context.ui.navbar,
          sidebar: {
            bg: event.target.dataset.sidebar,
            txt: event.target.dataset.text,
            cover: this.context.ui.sidebar.cover
          },
          footer: this.context.ui.footer
        }
      })
    }else{
      this.context.setState({
        name: 'ui',
        value: {
          id: this.context.ui.id,
          navbar: this.context.ui.navbar,
          sidebar: this.context.ui.sidebar,
          footer: {
            bg: event.target.dataset.footer,
            status: this.context.ui.footer.status
          },
        }
      })
    }
  }
  setFooter(event){
     this.context.setState({
      name: 'ui',
      value: {
        id: this.context.ui.id,
        navbar: this.context.ui.navbar,
        sidebar: this.context.ui.sidebar,
        footer: {
          bg: this.context.ui.footer.bg,
          status: event.target.checked ? true: false
        }
      }
    })
  }
  saveUi(event){
    let form = new FormData()
    form.append('navbar-bg', this.context.ui.navbar.bg)
    form.append('navbar-txt', this.context.ui.navbar.txt)
    form.append('sidebar-bg', this.context.ui.sidebar.bg)
    form.append('sidebar-txt', this.context.ui.sidebar.txt)
    form.append('footer-bg', this.context.ui.footer.bg)
    form.append('footer-status', this.context.ui.footer.status ? 'true': 'false')
    this.state['sidebar-cover'] ? form.append('sidebar-cover', this.state['sidebar-cover']): false
    this.state['profil-cover'] ? form.append('profil-cover', this.state['profil-cover']): false
    axios.post(BaseUrl + 'api/user-ui/update/' + this.context.ui.id, form, {headers: this.state.headers}).then(result => {
      M.toast({html: result.data.message})
    })
  }
  componentDidMount(){
    document.title = 'Setting View | Go Blog'
    var account = window.localStorage.getItem('account')
    if(account){
      this.setState({headers: {Authorization: JSON.parse(account).token}})
    }
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
                    <div className="row">
                      <div className="col s12">
                        <h6>Navbar</h6>
                        <div className="divider mb-10px"/>
                        <p>Color</p>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-navbar="blue darken-1" className="btn waves-effect waves-light blue darken-1">Default</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-navbar="red" className="btn waves-effect waves-light red">Red</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-navbar="pink" className="btn waves-effect waves-light pink">pink</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-navbar="purple" className="btn waves-effect waves-light purple">purple</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-navbar="deep-purple" className="btn waves-effect waves-light deep-purple">deep-purple</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-navbar="indigo" className="btn waves-effect waves-light indigo">indigo</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-navbar="blue" className="btn waves-effect waves-light blue">blue</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-navbar="light-blue" className="btn waves-effect waves-light light-blue">light-blue</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-navbar="cyan" className="btn waves-effect waves-light cyan">cyan</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-navbar="teal" className="btn waves-effect waves-light teal">teal</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-navbar="green" className="btn waves-effect waves-light green">Green</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-navbar="light-green" className="btn waves-effect waves-light light-green">light-green</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-navbar="lime" className="btn waves-effect waves-light lime">lime</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-navbar="yellow" className="btn waves-effect waves-light yellow">yellow</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-navbar="amber" className="btn waves-effect waves-light amber">amber</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-navbar="orange" className="btn waves-effect waves-light orange">orange</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-navbar="deep-orange" className="btn waves-effect waves-light deep-orange">deep-orange</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-navbar="brown" className="btn waves-effect waves-light brown">brown</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-navbar="grey" className="btn waves-effect waves-light grey">grey</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-navbar="blue-grey" className="btn waves-effect waves-light blue-grey">blue-grey</button>
                        <h6>Sidebar</h6>
                        <div className="divider mb-10px"/>
                        <p>Color</p>
                        <button type="button" onClick={this.setUI} data-text="black-text" data-sidebar="white" className="btn waves-effect waves-light white black-text">Default</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-sidebar="red" className="btn waves-effect waves-light red">Red</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-sidebar="pink" className="btn waves-effect waves-light pink">pink</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-sidebar="purple" className="btn waves-effect waves-light purple">purple</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-sidebar="deep-purple" className="btn waves-effect waves-light deep-purple">deep-purple</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-sidebar="indigo" className="btn waves-effect waves-light indigo">indigo</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-sidebar="blue" className="btn waves-effect waves-light blue">blue</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-sidebar="light-blue" className="btn waves-effect waves-light light-blue">light-blue</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-sidebar="cyan" className="btn waves-effect waves-light cyan">cyan</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-sidebar="teal" className="btn waves-effect waves-light teal">teal</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-sidebar="green" className="btn waves-effect waves-light green">Green</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-sidebar="light-green" className="btn waves-effect waves-light light-green">light-green</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-sidebar="lime" className="btn waves-effect waves-light lime">lime</button>
                        <button type="button" onClick={this.setUI} data-text="black-text" data-sidebar="yellow" className="btn waves-effect waves-light yellow">yellow</button>
                        <button type="button" onClick={this.setUI} data-text="black-text" data-sidebar="amber" className="btn waves-effect waves-light amber">amber</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-sidebar="orange" className="btn waves-effect waves-light orange">orange</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-sidebar="deep-orange" className="btn waves-effect waves-light deep-orange">deep-orange</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-sidebar="brown" className="btn waves-effect waves-light brown">brown</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-sidebar="grey" className="btn waves-effect waves-light grey">grey</button>
                        <button type="button" onClick={this.setUI} data-text="white-text" data-sidebar="blue-grey" className="btn waves-effect waves-light blue-grey">blue-grey</button>
                        <p>Cover Image Sidebar</p>
                        <div className="row">
                          <div className="file-field input-field col s12">
                            <div className="btn">
                              <span>Image</span>
                              <input onChange={this.onFileChange} name="sidebar-cover" accept=".jpg,.png" type="file"/>
                            </div>
                            <div className="file-path-wrapper">
                              <input className="file-path validate" type="text"/>
                            </div>
                          </div>
                        </div>
                        <h6>Cover Image Profile</h6>
                        <div className="divider mb-10px"/>
                        <div className="row">
                          <div className="file-field input-field col s12">
                            <div className="btn">
                              <span>Image</span>
                              <input onChange={this.onFileChange} name="profil-cover" accept=".jpg,.png" type="file"/>
                            </div>
                            <div className="file-path-wrapper">
                              <input className="file-path validate" type="text"/>
                            </div>
                          </div>
                        </div>
                        <h6>Footer</h6>
                        <div className="divider mb-10px"/>
                        <p>Color</p>
                        <button type="button" onClick={this.setUI} data-footer="light-blue" className="btn waves-effect waves-light light-blue white-text">Default</button>
                        <button type="button" onClick={this.setUI} data-footer="red" className="btn waves-effect waves-light red">Red</button>
                        <button type="button" onClick={this.setUI} data-footer="pink" className="btn waves-effect waves-light pink">pink</button>
                        <button type="button" onClick={this.setUI} data-footer="purple" className="btn waves-effect waves-light purple">purple</button>
                        <button type="button" onClick={this.setUI} data-footer="deep-purple" className="btn waves-effect waves-light deep-purple">deep-purple</button>
                        <button type="button" onClick={this.setUI} data-footer="indigo" className="btn waves-effect waves-light indigo">indigo</button>
                        <button type="button" onClick={this.setUI} data-footer="blue" className="btn waves-effect waves-light blue">blue</button>
                        <button type="button" onClick={this.setUI} data-footer="light-blue" className="btn waves-effect waves-light light-blue">light-blue</button>
                        <button type="button" onClick={this.setUI} data-footer="cyan" className="btn waves-effect waves-light cyan">cyan</button>
                        <button type="button" onClick={this.setUI} data-footer="teal" className="btn waves-effect waves-light teal">teal</button>
                        <button type="button" onClick={this.setUI} data-footer="green" className="btn waves-effect waves-light green">Green</button>
                        <button type="button" onClick={this.setUI} data-footer="light-green" className="btn waves-effect waves-light light-green">light-green</button>
                        <button type="button" onClick={this.setUI} data-footer="lime" className="btn waves-effect waves-light lime">lime</button>
                        <button type="button" onClick={this.setUI} data-footer="yellow" className="btn waves-effect waves-light yellow">yellow</button>
                        <button type="button" onClick={this.setUI} data-footer="amber" className="btn waves-effect waves-light amber">amber</button>
                        <button type="button" onClick={this.setUI} data-footer="orange" className="btn waves-effect waves-light orange">orange</button>
                        <button type="button" onClick={this.setUI} data-footer="deep-orange" className="btn waves-effect waves-light deep-orange">deep-orange</button>
                        <button type="button" onClick={this.setUI} data-footer="brown" className="btn waves-effect waves-light brown">brown</button>
                        <button type="button" onClick={this.setUI} data-footer="grey" className="btn waves-effect waves-light grey">grey</button>
                        <button type="button" onClick={this.setUI} data-footer="blue-grey" className="btn waves-effect waves-light blue-grey">blue-grey</button>
                        <p>Status</p>
                        <div className="switch">
                          <label>
                            Nonactive
                            <input type="checkbox" onChange={this.setFooter}/>
                            <span className="lever"></span>
                            Active
                          </label>
                        </div>
                        <button type="button" onClick={this.saveUi} className="btn waves-effect waves-light blue darken-2 mt-10px">
                          <i className="material-icons right">save</i>
                          Save Changes
                        </button>
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