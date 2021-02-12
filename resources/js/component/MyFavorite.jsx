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
import LazyImage from './tools/LazyImage.jsx';
/*context*/
import ContextDATA from '../ContextDATA';

class MyFavoriteCMP extends React.Component {
  state = {
    article: [],
    redirect: '',
    headers: {}
  }
  constructor(props){
    super(props)
    this.deleteData = this.deleteData.bind(this)
  }
  deleteData(e){
    axios.delete(`${BaseUrl}api/article-favorite/${e.target.dataset.id}`, {headers: this.state.headers}).then(result => {
      M.toast({html: result.data.message})
      this.setState({
        article: this.state.article.filter(data => {
          if(data.favorite_id !== e.target.dataset.id){
            return true
          }
        })
      })
    }).catch(e => errorStatusCode(e, this.setState({redirect: '/login'})))
  }
  componentDidMount(){
    document.title = 'My Favorite | Go Blog'
    var account = window.localStorage.getItem('account')
    if(account){
      this.setState({
        headers: {Authorization: JSON.parse(account).token}
      })
      axios.get(`${BaseUrl}api/article-favorite?paginate=true`, {headers: {Authorization: JSON.parse(account).token}}).then(result => {
        this.setState({article: result.data.data})
      })
    }
  }
  render(){
    if(this.state.redirect || !window.localStorage.getItem('account')) {
      return this.state.redirect ? <Redirect to={this.state.redirect} />: <Redirect to="/login" />
    }
    return(
      <React.Fragment>
      <BreadCrumb data={[{url: '/my-favorite', str: 'My Favorite'}]} />
        <div className="row">
        {
          this.state.article.length == 0 ? <div className="col s12 center-align"><p className="center-align" style={{marginTop: 150,marginBottom: 150}}>No Data Favorite</p></div>:
          this.state.article.map((article, key) => {
            return(
              <div className="col s12 m4 l4 list-article" key={key}>
                  <div className="card hoverable">
                    <div className="card-image waves-effect waves-dark">
                      <LazyImage
                        srcset={`${BaseUrl}api/usrfile/${article.user_id}/${article.image}`}
                        src="https://placehold.it/200x300?text=Image12"
                        alt="images"
                      />
                      <span className="card-title">{article.title}</span>
                    </div>
                    <div className="card-content">
                      <button className="btn btn-floating cyan waves-effect waves-light share activator"><i className="material-icons">share</i></button>
                      <button className="btn btn-floating white waves-effect waves-light avatar-user"><img className="responsive-img" src={`${BaseUrl}api/usrfile/${article.user_id}/${article.avatar}`} alt="avatar"/></button>
                      <p className="line-auto">{article.description}</p>
                      <p className="row">
                        <span className="left"><b>Publish</b></span>
                        <span className="right fs-12px">{article.created_at}</span>
                      </p>
                      <p className="row">
                        <span className="left"><b>Viewers</b></span>
                        <span className="right fs-12px">{article.views}</span>
                      </p>
                      <p className="row">
                        <span className="left"><b>By</b></span>
                        <span className="right fs-12px"><Link to={'/profile/' + article.user_id} className="blue-text waves-effect waves-dark">{article.name}</Link></span>
                      </p>
                    </div>
                    <div className="card-action">
                      <button className="btn btn-small blue"  onClick={() => window.location.hash = '/article/' + article.id}><i className="material-icons right">arrow_forward</i>Read More</button>
                      <button className="btn btn-small red right" data-id={article.favorite_id} onClick={this.deleteData}><i data-id={article.favorite_id} className="material-icons">delete</i></button>
                    </div>
                    <div className="card-reveal">
                      <span className="card-title grey-text text-darken-4">Share To<i className="material-icons right">close</i></span>
                      <div className="center-align">
                        <p>
                          <button className="btn grey">Copy Link<i className="material-icons left">content_copy</i></button>
                        </p>
                        <p>
                          <button className="btn blue">Facebook<i className="material-icons left">facebook</i></button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
            )
          })
        }
        </div>
      </React.Fragment>
    )
  }
}
export default MyFavoriteCMP;