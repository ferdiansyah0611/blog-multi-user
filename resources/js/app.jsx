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
import axios from 'axios';
/*packages*/
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
import PopularCMP from './component/Popular.jsx';
import SearchCMP from './component/Search.jsx';
import LatestCMP from './component/Latest.jsx';
import ViewArticleCMP from './component/ViewArticle.jsx';
import DashboardCMP from './component/Dashboard.jsx';
import ManageArticleCMP from './component/ManageArticle.jsx';
import ManageCategoryCMP from './component/ManageCategory.jsx';
import ManageCommentCMP from './component/ManageComment.jsx';
import ManageStorageCMP from './component/ManageStorage.jsx';
import PreffAccountCMP from './component/PreffAccount.jsx';
import ShowProfileCMP from './component/ShowProfile.jsx';
import ContactUSCMP from './component/ContactUS.jsx';
import MyFavoriteCMP from './component/MyFavorite.jsx';
import PremiumCMP from './component/Premium.jsx';

import SidenavCMP from './component/template/Sidenav.jsx';
import NavbarCMP from './component/template/Navbar.jsx';
import FooterCMP from './component/template/Footer.jsx';
/*---------------------------------------------------*/
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      category: [],
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
      notification: [],
      getNotification: (token) => {
      	axios.get(`${BaseUrl}api/user-notification?paginate=true`, {headers: {Authorization: token}}).then(result => {
          this.setState({notification: result.data.data})
          $(".dropdown-trigger").dropdown();
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
        this.state.getNotification(JSON.parse(account).token)
        this.setState({users: result.data.data})
        if(result.data.data.type == 5 && result.data.data.role == 'admin'){
          this.setState({
            menu_manage: ['Article', 'Comment', 'Storage', 'Category'],
            menu_preferences: [{txt:'Account',icon:'account_box',url: '/prefferences/account'}]
          })
        }else{
          this.setState({
            menu_manage: ['Article', 'Storage'],
            menu_preferences: [{txt:'Account',icon:'account_box',url: '/prefferences/account'}]
          })
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
			      	<Route path="/search" component={SearchCMP}/>
			      	<Route path="/premium" component={PremiumCMP}/>
			      	<Route path="/article/:id" component={ViewArticleCMP}/>
			      	<Route path="/contact-us" component={ContactUSCMP}/>
			      	<Route path="/my-favorite" component={MyFavoriteCMP}/>
			      	<Route path="/login" component={LoginCMP}/>
			      	<Route path="/login?destination=:destination" component={LoginCMP}/>
			      	<Route path="/register" component={RegisterCMP}/>
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
			      	<Route path="/prefferences/account">
			      	  <PreffAccountCMP/>
			      	</Route>
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