import React from 'react'
import ReactDOM from 'react-dom'
import {
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import axios from 'axios';
import Config from '../../Config';
/*tools*/
import BaseUrl from '../../tools/Base';
import errorStatusCode from '../../tools/errorStatusCode';
import print from '../../tools/print';
/*context*/
import ContextDATA from '../../ContextDATA';

class SidenavCMP extends React.Component {
  static contextType = ContextDATA;
  constructor(props) {
    super(props)
    this.state = {
      redirect: '',
      file_upload: '',
      uploadArticles: {
        title: '',
        category_id: '',
        description: '',
        status: '',
        image: ''
      },
      headers: {},
      time: ''
    }
    this.logout = this.logout.bind(this)
    this.adding = this.adding.bind(this)
    this.openAddArticle = this.openAddArticle.bind(this)
    this.upload = this.upload.bind(this)
    this.openUploadFile = this.openUploadFile.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
    this.onFileChangeArticle = this.onFileChangeArticle.bind(this)
    this.handle = this.handle.bind(this)
  }
  logout(e){
    window.localStorage.removeItem('account')
    this.context.setState({name: 'menu_manage', value:  []})
    this.context.setState({name: 'menu_preferences', value: []})
    this.context.setState({name: 'users', value: {name: 'You are not signed'}})
    this.context.setState({name: 'ui', value: {
      navbar: Config.navbar,
      sidebar: Config.sidebar,
      footer: Config.footer
    }})
    M.toast({html: 'Your account has logout'})
  }
  adding(event) {
    const formData = new FormData();
    Object.getOwnPropertyNames(this.state.uploadArticles).forEach(data => {
      formData.append(data, this.state.uploadArticles[data])
    })
    formData.append('content', tinymce.get('add_content').getContent())
    axios.post(BaseUrl + 'api/article', formData, {headers: this.state.headers}).then(result => {
      Swal.fire('Successfuly', result.data.message, 'success')
      this.setState(prevState => {
        var uploadArticles = Object.getOwnPropertyNames(prevState.uploadArticles).forEach(data => {
          uploadArticles[data] = ''
        })
        return uploadArticles
      })
    }).catch(e => errorStatusCode(e, this.setState({redirect: '/login'})))
  }
  openAddArticle(e){
    $('#modal-add-article').modal('open');
  }
  upload(){
    for (var i = 0; i < this.state.file_upload.length; i++) {
      var formData = new FormData()
      formData.append('file_upload', this.state.file_upload[i])
      axios.post(`${BaseUrl}api/upload-usrfile`, formData, {headers: this.state.headers}).then(result => {
        Swal.fire('Successfuly',result.data.message,'success');
      }).catch(e => errorStatusCode(e, this.setState({redirect: '/login'})))
    }
  }
  onFileChange(event) {
    this.setState({ file_upload: event.target.files }); 
  };
  onFileChangeArticle(event) {
    this.setState(prevState => {
      let uploadArticles = Object.assign({}, prevState.uploadArticles);
      uploadArticles['image'] = event.target.files[0];              
      return { uploadArticles };
    }); 
  }
  openUploadFile(e){
    $('#modal-upload-file').modal('open');
  }
  time(){
    setInterval(() => {
      var date = new Date()
      this.setState({
      	time: date.getFullYear() + '/' + date.getMonth() + 1 + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      })
    }, 1000)
  }
  handle(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState(prevState => {
      let uploadArticles = Object.assign({}, prevState.uploadArticles);
      uploadArticles[name] = value;              
      return { uploadArticles };
    })
  }
  componentDidUpdate() {
    $('.fixed-action-btn').floatingActionButton();
  }
  componentDidMount() {
    var account = window.localStorage.getItem('account')
    if(account){
      var users = JSON.parse(account)
      if(users.data.type == 5 && users.data.role == 'admin'){
        this.setState({
          headers: {
            Authorization: users.token
          }
        })
      }else{
        this.setState({
          headers: {
            Authorization: users.token
          }
        })
      }
    }
    document.querySelector('#toTop').onclick = (e) => window.scrollTo(0,0)
    window.addEventListener('scroll', e => {
      if(window.scrollY > 1000){
        document.querySelector('#toTop').classList.remove('hide')
      }else{
        document.querySelector('#toTop').classList.add('hide')
      }
    })
    tinymce.init({
      selector: 'textarea[name="add_content"]',
      setup: function (editor) {
      editor.on('init', function (e) {
        editor.setContent('<p>Type Here...</p>');
      });
    }
    });
    $(document).ready(function(){
      $('.sidenav').sidenav();
      $('.collapsible').collapsible();
      $('.fixed-action-btn').floatingActionButton();
      $('.tooltipped').tooltip();
      $('#modal-upload-file').modal();
      $('#modal-add-article').modal();
    });
    this.time()
  }
  render() {
    if(this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return(
      <React.Fragment>
        <a id="toTop" className="btn-floating btn-large waves-effect waves-light red hide tooltipped" data-position="right" data-tooltip="Back To Top">
        	<i className="material-icons">north</i>
        </a>
        <div id="modal-upload-file" className="modal modal-fixed-footer">
          <div className="modal-content">
            <h4>Uploads File</h4>
            <div className="row">
              <div className="file-field input-field col s12">
                <div className="btn">
                  <span>File</span>
                  <input onChange={this.onFileChange} type="file" multiple={true}/>
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text"/>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn-small blue darken-2 waves-effect waves-white" onClick={this.upload}>
            	<span className="material-icons right">cloud_upload</span>
            </button>
          </div>
        </div>
        <div id="modal-add-article" className="modal modal-fixed-footer">
          <div className="modal-content">
            <h4>Create Article</h4>
            <div className="row" style={{marginTop:10}}>
              <div className="col s6">
                <div className="row">
                  <div className="input-field col s12">
                    <input id="last_name" type="text" name="title" onChange={this.handle} className="validate"/>
                    <label htmlFor="last_name">Title</label>
                  </div>
                  <div className="input-field col s12">
                    <select name="category_id" onChange={this.handle} defaultValue="Choose your option" className="browser-default">
                      <option value="Choose your option" disabled>Choose category article</option>
                        {
                        this.context.category.map((text, key) => {
                          return(
                            <option key={key} value={text.id}>{text.name}</option>
                          )
                        })
                        }
                    </select>
                  </div>
                </div>
              </div>
              <div className="col s6">
                <div className="row">
                  <div className="file-field input-field col s12">
                    <div className="btn">
                      <span>File</span>
                      <input onChange={this.onFileChangeArticle} type="file"/>
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" type="text" placeholder="Upload Image Files"/>
                    </div>
                  </div>
                  <div className="input-field col s12">
                    <select name="status" onChange={this.handle} defaultValue="Choose your option" className="browser-default">
                      <option value="Choose your option" disabled>Choose status article</option>
                      <option value="public">Public</option>
                      <option value="archive">Archives</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field col s12">
              <label>Description</label>
                <textarea name="description" className="materialize-textarea" onChange={this.handle}/>
              </div>
              <div className="input-field col s12">
                <textarea name="add_content" id="content"/>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn-small blue waves-effect waves-white" onClick={this.adding}><span className="material-icons right">cloud_upload</span></button>
          </div>
        </div>
        <ContextDATA.Consumer>
        {
          result => (
            <React.Fragment>
            {
              <div className="fixed-action-btn">
                <a className="btn-floating btn-large red">
                	<i className="large material-icons">mode_edit</i>
                </a>
                <ul>
                	<li>
                		<a className={result.users.id ? "btn-floating green": "btn-floating green disabled"} title="Post Article" onClick={this.openAddArticle}>
                			<i className={result.ui.sidebar.txt ? "material-icons " + result.ui.sidebar.txt: "material-icons"}>post_add</i>
                		</a>
                	</li>
                	<li>
                		<a className={result.users.id ? "btn-floating blue": "btn-floating green disabled"} title="Upload File" onClick={this.openUploadFile}>
                			<i className={result.ui.sidebar.txt ? "material-icons " + result.ui.sidebar.txt: "material-icons"}>attach_file</i>
                		</a>
                	</li>
                </ul>
              </div>
            }
            <ul id="slide-out" className={result.ui.sidebar.bg ? "sidenav sidenav-fixed " + result.ui.sidebar.bg: "sidenav sidenav-fixed"}>
              <li>
                <div className="user-view">
                  <div className="background">
                    <img src={result.ui.sidebar.cover}/>
                  </div>
                  <Link to={'/profile/' + result.users.id}>
                    <img className="circle" src={result.users.avatar ? `${BaseUrl}api/usrfile/${result.users.id}/${result.users.avatar}`: Config.users.avatarDefault}/>
                  </Link>
                  <Link to={'/profile/' + result.users.id}>
                    <span className="white-text name">{result.users.name}</span>
                  </Link>
                  <Link to={'/profile/' + result.users.id}>
                    <span className="white-text email">{result.users.email}</span>
                  </Link>
                </div>
              </li>
              <li>
                <Link className={result.ui.sidebar.txt ? "waves-effect waves-dark " + result.ui.sidebar.txt: "waves-effect waves-dark"} to="/">
                  <i className={result.ui.sidebar.txt ? "material-icons " + result.ui.sidebar.txt: "material-icons"}>home</i>Home
                </Link>
              </li>
              {
                result.menu_manage.length >= 1 ?
                <React.Fragment>
                <li>
                  <Link className={result.ui.sidebar.txt ? "waves-effect waves-dark " + result.ui.sidebar.txt: "waves-effect waves-dark"} to="/dashboard">
                    <i className={result.ui.sidebar.txt ? "material-icons " + result.ui.sidebar.txt: "material-icons"}>insert_chart</i>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link className={result.ui.sidebar.txt ? "waves-effect waves-dark " + result.ui.sidebar.txt: "waves-effect waves-dark"} to="/my-favorite">
                    <i className={result.ui.sidebar.txt ? "material-icons " + result.ui.sidebar.txt: "material-icons"}>favorite</i>
                    My Favorite
                  </Link>
                </li>
                <li>
                  <Link className={result.ui.sidebar.txt ? "waves-effect waves-dark " + result.ui.sidebar.txt: "waves-effect waves-dark"} to="/my-subscribe">
                    <i className={result.ui.sidebar.txt ? "material-icons " + result.ui.sidebar.txt: "material-icons"}>subscriptions</i>
                    My Subscribe
                  </Link>
                </li>
                <li>
                  <div className="divider"></div>
                </li>
                <li>
                  <a className={result.ui.sidebar.txt ? "subheader " + result.ui.sidebar.txt: "subheader"}>Management</a>
                </li>
                {
                  result.menu_manage.map((text, key) => {
                  return(
                    <li key={key}>
                      <Link className={result.ui.sidebar.txt ? "waves-effect waves-dark " + result.ui.sidebar.txt: "waves-effect waves-dark"} to={'/management/' + text.toLowerCase()}>
                        <i className={result.ui.sidebar.txt ? "material-icons " + result.ui.sidebar.txt: "material-icons"}>folder</i>
                        {text}
                      </Link>
                    </li>
                  )
                })
                }
                </React.Fragment>
                : ''
              }
              {
                result.menu_preferences.length >= 1 ?
                <React.Fragment>
                <li><div className="divider"></div></li>
                <li><a className={result.ui.sidebar.txt ? "subheader " + result.ui.sidebar.txt: "subheader"}>Setting</a></li>
                {
                  result.menu_preferences.map((text, key) => {
                  return(
                    <li key={key}>
                      <Link className={result.ui.sidebar.txt ? "waves-effect waves-dark " + result.ui.sidebar.txt: "waves-effect waves-dark"} to={text.url}>
                        <i className={result.ui.sidebar.txt ? "material-icons " + result.ui.sidebar.txt: "material-icons"}>{text.icon}</i>
                        {text.txt}
                      </Link>
                    </li>
                  )
                  })
                }
                {
                  result.menu_manage.length >= 1 ?
                    <li onClick={this.logout}>
                      <a style={{cursor: 'pointer'}}>
                        <i className={result.ui.sidebar.txt ? "material-icons " + result.ui.sidebar.txt: "material-icons"}>arrow_back</i>
                        <span className={result.ui.sidebar.txt ? result.ui.sidebar.txt: ''}>Logout</span>
                      </a>
                    </li>: ''
                }
                </React.Fragment>
                : ''
              }
              {
                result.menu_manage.length >= 1 ?
                ''
                :
                <React.Fragment>
                  <li>
                    <div className="divider"></div>
                  </li>
                  <li>
                    <a className={result.ui.sidebar.txt ? "subheader " + result.ui.sidebar.txt: "subheader"}>Auth</a>
                  </li>
                  <li>
                    <Link className={result.ui.sidebar.txt ? "waves-effect waves-dark " + result.ui.sidebar.txt: "waves-effect waves-dark"} to="/login">
                    <i className={result.ui.sidebar.txt ? "material-icons " + result.ui.sidebar.txt: "material-icons"}>login</i>
                    Login</Link>
                  </li>
                  <li>
                    <Link className={result.ui.sidebar.txt ? "waves-effect waves-dark " + result.ui.sidebar.txt: "waves-effect waves-dark"} to="/register">
                    <i className={result.ui.sidebar.txt ? "material-icons " + result.ui.sidebar.txt: "material-icons"}>text_snippet</i>
                    Register</Link>
                  </li>
                </React.Fragment>
              }
              <li><div className="divider"></div></li>
              <li><a className={result.ui.sidebar.txt ? "subheader " + result.ui.sidebar.txt: "subheader"}>More</a></li>
              <li>
                <Link className={result.ui.sidebar.txt ? "waves-effect waves-dark " + result.ui.sidebar.txt: "waves-effect waves-dark"} to="/premium">
                <i className={result.ui.sidebar.txt ? "material-icons " + result.ui.sidebar.txt: "material-icons"}>shop</i>
                Buy Premium</Link>
              </li>
              <li>
                <Link to="/" className="black-text waves-effect waves-dark">
                  <i className={result.ui.sidebar.txt ? "material-icons " + result.ui.sidebar.txt: "material-icons"}>today</i>
                  <span className={result.ui.sidebar.txt ? result.ui.sidebar.txt: ''}>{this.state.time}</span>
                </Link>
              </li>
            </ul>
            </React.Fragment>
          )
        }
        </ContextDATA.Consumer>
      </React.Fragment>
    )
  }
}
export default SidenavCMP;