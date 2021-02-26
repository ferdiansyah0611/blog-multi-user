import React from 'react';
import axios from 'axios';
import {
  Link,
} from "react-router-dom";
import Config from '../../Config';
import ColsArticleCMP from './ColsArticleCMP.jsx';
import Loader from './Loader.jsx';
import BaseUrl from '../../tools/Base';
import ContextDATA from '../../ContextDATA';

class ArticleLoadCMP extends React.Component {
  constructor(props){
    super();
    this.state = {
      article: [],
      paginate: 1,
      finished: false
    }
    this.nextArticle = this.nextArticle.bind(this)
  }
  componentDidMount(){
    var url, headers = {};
    this.props.headers ? headers = {headers: {Authorization: JSON.parse(window.localStorage.getItem('account')).token}}:''
    if(this.props.query){
      url = `${this.props.url}?${this.props.query}&page=1&default=true`
    }
    else{
      url = `${this.props.url}?page=1&default=true`
    }
    axios.get(url, headers).then(result => {
      this.setState({
        article: result.data.data,
        finished: true
      })
    })
  }
  nextArticle(e){
    this.setState({finished: false})
    var url,headers = {};
    this.props.headers ? headers = {headers: {Authorization: JSON.parse(window.localStorage.getItem('account')).token}}:''
    if(this.props.query){
      url = `${this.props.url}?${this.props.query}&page=${this.state.paginate + 1}&default=true`
    }
    else{
      url = `${this.props.url}?page=${this.state.paginate + 1}&default=true`
    }
    document.querySelector('#' + this.props.id_next).setAttribute('disabled', true)
    axios.get(url, headers).then(result => {
      if(result.data.data.length >= 1){
        this.setState({paginate: this.state.paginate + 1})
        this.setState({
          article: [...this.state.article, ...result.data.data],
          finished: true
        })
        document.querySelector('#' + this.props.id_next).removeAttribute('disabled')
      }if(result.data.data.length == 0){
        this.setState({finished: true})
        document.querySelector('#' + this.props.id_next).removeAttribute('disabled')
      }
    })
  }
  render(){
    return(
      <React.Fragment>
      <div className="row">
      {
        this.state.article.map((text, key) => {
          return(
            <ColsArticleCMP key={key} data={{
              id: text.id,
              user_id: text.user_id,
              title: text.title,
              description: text.description,
              author: text.name,
              views: text.views,
              gender: text.gender,
              location: text.location,
              image: `${BaseUrl}api/usrfile/${text.user_id}/${text.image}`,
              avatar: text.avatar.length == 0 ? Config.users.avatarDefault:`${BaseUrl}api/usrfile/${text.user_id}/${text.avatar}`,
              created_at: text.created_at,
            }}/>
          )
        })
      }
      <ContextDATA.Consumer>
        {
          result => (
            !result.users.id || result.users.role == 0 ?
            <div className="col s12">
              <div className="grey lighten-2 center-align">
                <h5 style={{padding: 20}}>Ads Here</h5>
              </div>
            </div>
            : false
          )
        }
      </ContextDATA.Consumer>
      </div>
      {
        this.state.finished ? this.state.article.length == 0 ? <p className="center-align">No Data</p>:'': <Loader/>
      }
      {
        this.state.finished === 'error' ? <h6 className="center">Data Not found</h6>: ''
      }
      {
        this.state.article.length !== 0 ? 
        <div className="center-align mb-10px">
          <a id={this.props.id_next} className="waves-effect waves-light blue btn" style={{marginLeft:5}} onClick={this.nextArticle}><i className="material-icons right">expand_more</i>Load More</a>
        </div>
        :''
      }
      </React.Fragment>
    )
  }
}
export default ArticleLoadCMP;