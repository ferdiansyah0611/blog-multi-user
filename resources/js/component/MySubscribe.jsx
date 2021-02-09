import React from 'react'
import ReactDOM from 'react-dom'
import {
  Route,
  Link,
  Redirect
} from "react-router-dom";
import axios from 'axios';
import functionAction from './tools/FunctionAction';
import BaseUrl from '../tools/Base';
import Config from '../Config';
import BreadCrumb from './tools/BreadCrumb.jsx'
import Loader from './tools/Loader.jsx';
/*context*/
import ContextDATA from '../ContextDATA';

class MySubscribeCMP extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      users: {
        data: [],
        total: ''
      },
      paginate: 1,
      finished: false
    }
    this.addSubscribe = this.addSubscribe.bind(this)
    this.nextData = this.nextData.bind(this)
  }
  componentDidMount(){
    document.title = 'My Subscribe | Go Blog'
    var account = window.localStorage.getItem('account')
    if(account){
      axios.get(BaseUrl + 'api/article-subscribe?default=truepage=' + this.state.paginate, {headers: {Authorization: JSON.parse(account).token}}).then(result => {
        this.setState({
          users: {
            data: result.data.data,
            total: result.data.total
          },
          finished: true
        })
      })
    }
  }
  async addSubscribe(e){
    let subscribe = await functionAction.subscribeUser('Subscribe', e.target.dataset.user_id).then(() => {
      this.setState({
        users: {
          data: this.state.users.data.filter(data => data.user_subscribe_id !== e.target.dataset.user_id),
          total: (Number(this.state.users.total) - 1).toString()
        },
        finished: true
      })
    })
  }
  nextData(){
    document.querySelector('#next-subscribe').setAttribute('disabled', true)
    var account = window.localStorage.getItem('account')
    if(account){
      axios.get(`${BaseUrl}api/article-subscribe?default=true&page=${this.state.paginate + 1}`, {headers: {Authorization: JSON.parse(account).token}}).then(result => {
        if(result.data.data.length >= 1){
          this.setState({paginate: this.state.paginate + 1})
          this.setState({
            users: {
              data: [...this.state.users.data, ...result.data.data],
              total: result.data.total
            },
            finished: true
          })
          document.querySelector('#next-subscribe').removeAttribute('disabled')
        }if(result.data.data.length == 0){
          this.setState({
            finished: true
          })
          document.querySelector('#next-subscribe').removeAttribute('disabled')
        }
      })
    }
  }
  render(){
    if(this.state.redirect || !window.localStorage.getItem('account')) {
      return this.state.redirect ? <Redirect to={this.state.redirect} />: <Redirect to="/login?destination=/dashboard" />
    }
    return(
      <React.Fragment>
      <BreadCrumb data={[{url: '/my-subscribe', str: 'My Subscribe'}]} />
        <h5 className="ml-10px">My Subscribe</h5>
        <ContextDATA.Consumer>
        {
          result => (
            <div className="row">
              {
                this.state.finished ?
                  <React.Fragment>
                  {
                    this.state.users.data.length == 0 ?
                      <p className="center-align m-100px">Subscribe Does Not Exist</p>:
                      this.state.users.data.map((data, key) => {
                        return(
                        <div className="col s12 m4 l3 list-profile" key={key}>
                          <div className="card hoverable">
                            <div className="card-image">
                              <img src={data.avatar.length == 0 ? Config.users.avatarDefault: BaseUrl + 'api/usrfile/' + data.user_subscribe_id + '/' + data.avatar}/>
                              <span className="card-title">{data.name}</span>
                            </div>
                            <div className="card-content">
                              <button
                                disabled={result.users.id !== data.user_subscribe_id? false: true}
                                data-user_id={data.user_subscribe_id}
                                onClick={this.addSubscribe}
                                className="btn btn-floating red waves-effect waves-light subscribe">
                                  <i
                                    data-user_id={data.user_subscribe_id}
                                    className="material-icons">subscriptions
                                  </i>
                              </button>
                              <p className="line-auto">{data.bio}</p>
                            </div>
                            <div className="card-action">
                              <Link to={"/profile/" + data.user_subscribe_id} className="blue-text waves-effect waves-dark">View Profile</Link>
                            </div>
                          </div>
                        </div>
                        )
                      })
                  }
                  </React.Fragment>
                  : <Loader/>
              }
            </div>
          )
        }
        </ContextDATA.Consumer>
        {
          this.state.users.data.length >= 1 ? <p style={{marginLeft: 10}}>Total Result: {this.state.users.total}</p>: false
        }
        {
          this.state.users.data.length >= 20 ?
          <React.Fragment>
          <div className="center-align mb-10px">
            <a id="next-subscribe" className="waves-effect waves-light blue btn" style={{marginLeft:5}} onClick={this.nextData}><i className="material-icons right">expand_more</i>Load More</a>
          </div>
          </React.Fragment>
          :false
        }
      </React.Fragment>
    )
  }
}

export default MySubscribeCMP;