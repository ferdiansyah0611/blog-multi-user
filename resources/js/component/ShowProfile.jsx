import React from 'react'
import {
  Link,
  Redirect,
} from "react-router-dom";
import axios from 'axios';
import Config from '../Config';
import BreadCrumb from './tools/BreadCrumb.jsx';
import Datatables from './tools/Datatables.jsx';
import ArticleLoadCMP from './tools/ArticleLoadCMP.jsx';
import Loader from './tools/Loader.jsx';
import ReportUser from './tools/ReportUser.jsx';
import Slider from './tools/Slider.jsx';
/*tools*/
import BaseUrl from '../tools/Base';
import errorStatusCode from '../tools/errorStatusCode';
import print from '../tools/print';
import functionAction from './tools/FunctionAction';
/*context*/
import ContextDATA from '../ContextDATA';

class ShowProfileCMP extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      users: {},
      statusSubscribe: 'Subscribe',
      finished: false,
      found: false
    }
    this.addSubscribe = this.addSubscribe.bind(this)
  }
  componentDidMount(){
    this.fetchAPI()
    $('.parallax').parallax();
  }
  componentDidUpdate(prevProp){
    if(this.props.match.params.id !== prevProp.match.params.id){
      this.fetchAPI()
    }
  }
  async addSubscribe(){
    let subscribe = await functionAction.subscribeUser(this.state.statusSubscribe, this.state.article.user_id)
    if(subscribe.statusSubscribe == 'Subscribed'){
      this.setState({statusSubscribe: 'Subscribed'})
    }
    if(subscribe.statusSubscribe == 'Subscribe'){
      this.setState({statusSubscribe: 'Subscribe'})
    }
  }
  async fetchAPI(paginate = 1){
    await axios.get(`${BaseUrl}api/user/${this.props.match.params.id}`).then(result => {
      document.title = result.data.name + ' | Go BLog'
      this.setState({
        'users': result.data,
        found: true,
        finished: true
      })
      $('.tabs').tabs();
      $('.parallax').parallax();
      var account = window.localStorage.getItem('account')
      if(account){
        axios.get(`${BaseUrl}api/article-subscribe?user_subscribe_id=${result.data.id}`,{
          headers: {Authorization: JSON.parse(account).token}
        }).then(results => {
          if(results.data.id){
            this.setState({statusSubscribe: 'Subscribed'})
          }
        })
      }
    })
  }
  render() {
    return(
      <React.Fragment>
      {
        this.state.found ?
        <React.Fragment>
        <div className="parallax-container default">
          <div className="parallax">
            <img src="https://images.unsplash.com/photo-1606044466411-207a9a49711f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHw%3D&auto=format&fit=crop&w=600&q=60"/>
          </div>
          <div className="row">
            <div className="col s12">
                <div className="row">
                  <div className="col s12">
                    <div className="center-align">
                      <img style={{maxWidth: '100%', maxHeight: 167}} className="circle waves-effect waves-light" src={this.state.users.avatar.length == 0 ? Config.users.avatarDefault: `${BaseUrl}api/usrfile/${this.props.match.params.id}/${this.state.users.avatar}`}/>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div className="card-content">
          <div className="row">
            <div className="col s12 m8 offset-m2 white z-depth-1" style={{marginTop:'-100px'}}>
              <div className="black-text">
                <h5>{this.state.users.name}</h5>
                <div className="divider"/>
                <p className="black-text">{this.state.users.bio == null ? 'Bio is not created by its users': this.state.users.bio}</p>
                <div className="divider"/>
                <div className="row mt-10px">
                  <div className="col s11">
                  <ContextDATA.Consumer>
                    {
                      result => (
                        <React.Fragment>
                          <button
                            disabled={result.users.id ? result.users.id !== this.state.users.id? false: true: true}
                            className="btn waves-light waves-effect blue mt-10px"
                            onClick={this.addSubscribe}
                          >{this.state.statusSubscribe}</button>
                          <ReportUser user_id={this.state.users.id} disabled={result.users.id ? result.users.id !== this.state.users.id? false: true: true}/>
                        </React.Fragment>
                      )
                    }
                  </ContextDATA.Consumer>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              {
                this.state.users.id ? <Slider url={`${BaseUrl}api/article`} query={"popular=true&user_id=" + this.state.users.id}  />:false
              }
              <ul className="tabs">
                <li className="tab col s6"><a className="active" href="#blog-tabs">Blog</a></li>
                <li className="tab col s6"><a href="#information-blog">Information</a></li>
              </ul>
            </div>
            <div id="blog-tabs" className="col s12">
              <h5 style={{marginLeft:10}}>Post Blog</h5>
              {
                this.state.users.id ? <ArticleLoadCMP url={BaseUrl + 'api/article'} query={"users=" + this.state.users.id} id_next="next_article"/>:''
              }
              {
                this.state.finished ? '': <Loader/>
              }
            </div>
            <div id="information-blog" className="col s12">
              <ul className="collection">
                <li className="collection-item avatar">
                  <i className="material-icons circle red">badge</i>
                  <span className="title">Name</span>
                  <p>{this.state.users.name}</p>
                </li>
                <li className="collection-item avatar">
                  <i className="material-icons circle red">account_circle</i>
                  <span className="title">Gender</span>
                  <p>{this.state.users.gender}</p>
                </li>
                <li className="collection-item avatar">
                  <i className="material-icons circle red">calendar_today</i>
                  <span className="title">Born</span>
                  <p>{this.state.users.born}</p>
                </li>
                <li className="collection-item avatar">
                  <i className="material-icons circle red">place</i>
                  <span className="title">Location</span>
                  <p>{this.state.users.location}</p>
                </li>
                <li className="collection-item avatar">
                  <i className="material-icons circle red">description</i>
                  <span className="title">Bio</span>
                  <p>{this.state.users.bio == null ? 'Bio is not created by its users': this.state.users.bio}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        </React.Fragment>
        :''
      }
      </React.Fragment>
    )
  }
}
export default ShowProfileCMP;