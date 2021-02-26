import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Prompt,
  Switch,
  Redirect,
  useHistory,
  HashRouter
} from "react-router-dom";
import Config from './Config';
/*packages*/
window.axios = require('axios')
window.Swal = require('sweetalert2')
import 'dropzone/dist/min/dropzone.min.css'
require('dropzone/dist/min/dropzone.min.js')
/*materiliaze*/
import css from 'materialize-css/dist/css/materialize.min.css'
require('materialize-css/dist/js/materialize.min.js')
/*scss*/
import '../scss/template.scss';
import '../scss/utilites.scss';
/*tools*/
import BaseUrl from './tools/Base';
import errorStatusCode from './tools/errorStatusCode';
import print from './tools/print';
/*context*/
import ContextDATA from './ContextDATA';
/*component*/
import LoginCMP from './component/Login.jsx';
import RegisterCMP from './component/Register.jsx';
import Home from './component/Home.jsx';
import VerifiedCode from './component/VerifiedCode.jsx';
import PopularCMP from './component/Popular.jsx';
import SearchCMP from './component/Search.jsx';
import ResetCode from './component/ResetCode.jsx';
import LatestCMP from './component/Latest.jsx';
import ViewArticleCMP from './component/ViewArticle.jsx';
import DashboardCMP from './component/Dashboard.jsx';
import ManageArticleCMP from './component/ManageArticle.jsx';
import ManageCategoryCMP from './component/ManageCategory.jsx';
import ManageCommentCMP from './component/ManageComment.jsx';
import ManageStorageCMP from './component/ManageStorage.jsx';
import SetAccountCMP from './component/SetAccount.jsx';
import SetViewCMP from './component/SetView.jsx';
import ShowProfileCMP from './component/ShowProfile.jsx';
import ContactUSCMP from './component/ContactUS.jsx';
import MyFavoriteCMP from './component/MyFavorite.jsx';
import MySubscribeCMP from './component/MySubscribe.jsx';
import PremiumCMP from './component/Premium.jsx';
import Category from './component/Category.jsx';

import SidenavCMP from './component/template/Sidenav.jsx';
import NavbarCMP from './component/template/Navbar.jsx';
import FooterCMP from './component/template/Footer.jsx';


/*---------------------------------------------------*/
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      category: [],
      search: '',
      locationAPI: [],
      menu_manage: [],
      menu_preferences: [],
      users: {
        id:'',
        name:'You are not signed',
        email:'',
        location:'',
        gender:'',
        born:''
      },
      ui: {
        navbar: Config.navbar,
        sidebar: Config.sidebar,
        footer: Config.footer
      },
      notification: [],
      page_notification: 1,
      getMount: () => {
        this.componentDidMount()
      },
      getNotification: (page = null) => {
      	axios.get(`${BaseUrl}api/user-notification?paginate=true&page=${page}`).then(result => {
          this.setState({page_notification: page,notification: [...this.state.notification, ...result.data.data]})
        })
      },
      setState: (data) => {
        this.setState({[data.name]: data.value})
      }
    }
  }
  componentDidMount(){
    axios.get(BaseUrl + 'api/category').then(result => {
      this.setState({category: result.data})
    })
    var account = window.localStorage.getItem('account')
    if(account){
      axios.get(`${BaseUrl}api/valid?token=${JSON.parse(account).token}`, {headers: {Authorization: JSON.parse(account).token}}).then(result => {
        axios.defaults.headers.common['Authorization'] = JSON.parse(account).token;
        axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="X-CSRF-TOKEN"]').getAttribute('content')
        this.state.getNotification(1)
        this.setState({users: result.data.data})
        let type = result.data.data.type, role = result.data.data.role;
        /*notification sidenav*/
        $('#slide-in').sidenav({edge:'right'});
        $('#slide-in').sidenav('close');
        type == '1' || type == '2' || type == '3' || type == '4' || type == '5' ?
          axios.get(BaseUrl + 'api/user-ui', {headers: {Authorization: JSON.parse(account).token}}).then(result => {
            this.setState({
              ui: {
                id: result.data.id,
                navbar: {
                  bg: result.data['navbar-bg'],
                  txt: result.data['navbar-txt']
                },
                sidebar: {
                  bg: result.data['sidebar-bg'],
                  txt: result.data['sidebar-txt'],
                  cover: result.data['sidebar-cover'] !== 'null' ? BaseUrl + 'api/usrfile/' + result.data.user_id + '/' + result.data['sidebar-cover']: this.state.ui.sidebar.cover
                },
                footer: {
                  bg: result.data['footer-bg'],
                  status: result.data['footer-status'] == 'true' ? true: false
                }
              }
            })
          })
        : ''
        if(type == '5' && role == 'admin'){
          this.setState({
            menu_manage: ['Article', 'Comment', 'Storage', 'Category'],
            menu_preferences: [
              {txt:'Account',icon:'account_box',url: '/setting/account'},
              {txt:'View',icon:'preview',url: '/setting/view'}
            ]
          })
          return true;
        }
        if(type == '1' || type == '2' || type == '3' || type == '4' && role == 'premium'){
          this.setState({
            menu_manage: ['Article', 'Comment', 'Storage'],
            menu_preferences: [
              {txt:'Account',icon:'account_box',url: '/setting/account'},
              {txt:'View',icon:'preview',url: '/setting/view'}
            ]
          })
          return true;
        }
        else{
          this.setState({
            menu_manage: ['Article', 'Comment', 'Storage'],
            menu_preferences: [
              {txt:'Account',icon:'account_box',url: '/setting/account'},
            ]
          })
          return true;
        }
      }).catch(e => {
        if(e.response && e.response.status == 401){
          this.setState({
            users: {
              name: 'You are not signed'
            },
            menu_manage: [],
            menu_preferences: []
          })
          window.localStorage.removeItem('account');
          M.toast({html: 'The login session has ended. Please login again.'})
        }
      })
    }
    if(window.localStorage.getItem('locationCountry')){
      this.setState({locationAPI: JSON.parse(window.localStorage.getItem('locationCountry'))})
    }
    if(!window.localStorage.getItem('locationCountry')){
      axios.get('https://restcountries.eu/rest/v2/all').then(result => {
        this.setState({locationAPI: result.data})
        window.localStorage.setItem('locationCountry', JSON.stringify(result.data))
      })
    }
  }
  render(){
    return (
      <ContextDATA.Provider value={this.state}>
      <HashRouter>
      	<SidenavCMP/>
      	<div id="body">
      		<div id="body-nav">
			      <NavbarCMP/>
      		</div>
      		<div id="body-page">
			    	<Switch>
			      	<Route exact path="/" component={Home}/>
			      	<Route path="/popular" component={PopularCMP}/>
			      	<Route path="/latest" component={LatestCMP}/>
              <Route path="/search/:search" component={SearchCMP}/>
			      	<Route path="/premium" component={PremiumCMP}/>
			      	<Route path="/article/:id" component={ViewArticleCMP}/>
              <Route path="/category/:name" component={Category}/>
			      	<Route path="/contact-us" component={ContactUSCMP}/>
			      	<Route path="/me/favorite" component={MyFavoriteCMP}/>
              <Route path="/me/subscribe" component={MySubscribeCMP} />
			      	<Route path="/login" component={LoginCMP}/>
			      	<Route path="/login?destination=:destination" component={LoginCMP}/>
			      	<Route path="/register" component={RegisterCMP}/>
              <Route path="/verification" component={VerifiedCode}/>
              <Route path="/reset" component={ResetCode}/>
			      	<Route path="/dashboard">
			      	  <DashboardCMP/>
			      	</Route>
			      	<Route path="/profile/:id" component={ShowProfileCMP}/>
			      	<Route path="/management/article">
			      	  <ManageArticleCMP/>
			      	</Route>
			      	<Route path="/management/category">
			      	  <ManageCategoryCMP/>
			      	</Route>
			      	<Route path="/management/comment">
			      	  <ManageCommentCMP/>
			      	</Route>
			      	<Route path="/management/storage" component={ManageStorageCMP}/>
			      	<Route path="/setting/account" component={SetAccountCMP}/>
              <Route path="/setting/view" component={SetViewCMP}/>
			    	</Switch>
		        <FooterCMP/>
      		</div>
      	</div>
      </HashRouter>
      </ContextDATA.Provider>
    );

  }
}
ReactDOM.render(
    <App />,
  document.querySelector('#app'),
);