import React from 'react'
import {
  Link,
  Redirect,
} from "react-router-dom";
import axios from 'axios';
import BreadCrumb from './tools/BreadCrumb.jsx';
import Datatables from './tools/Datatables.jsx';
import ReportUser from './tools/ReportUser.jsx';
/*tools*/
import BaseUrl from '../tools/Base';
import errorStatusCode from '../tools/errorStatusCode';
import print from '../tools/print';
import ArticleLoadCMP from './tools/ArticleLoadCMP.jsx';
import functionAction from './tools/FunctionAction';
import Loader from './tools/Loader.jsx';
/*context*/
import ContextDATA from '../ContextDATA';

class ViewArticleCMP extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      article: {},
      comment: [],
      create_comment: '',
      isAuth: true,
      headers: {},
      listuserview: [],
      nameIconFavorite: 'favorite_border',
      statusFavorite: 'Favorite',
      statusSubscribe: 'Subscribe',
      category_report: '',
      description_report: '',
      finishedComment: false,
      finishedArticle: false
    }
    this.addSubscribe = this.addSubscribe.bind(this)
    this.addComment = this.addComment.bind(this)
    this.addFavorite = this.addFavorite.bind(this)
    this.handle = this.handle.bind(this)
  }
  componentDidMount(){
    window.scrollTo(0,0)
    $('#modal-report').modal();
    this.fetchAPI()
    this.uploadView()
    $('#modal-userview').modal();
    var account = window.localStorage.getItem('account')
    if(account){
      this.setState({
        isAuth: false,
        headers: {Authorization: JSON.parse(account).token}
      })
    }
  }
  componentDidUpdate(prefProps){
    if(prefProps.match.params.id !== this.props.match.params.id){
      this.setState({
        comment: [],
        article: [],
        finishedComment:false,
        finishedArticle:false,
        nameIconFavorite: 'favorite_border',
        statusFavorite: 'Favorite'
      })
      this.componentDidMount()
    }
  }
  fetchAPI(){
    axios.get(`${BaseUrl}api/article/${this.props.match.params.id}`).then(result => {
      this.setState({'article': result.data,finishedArticle:true})
      document.querySelector('#show-article').addEventListener('selectstart', e => {
        e.preventDefault()
        return false
      })
      document.querySelector('#show-article').addEventListener('paste', e => {
        e.preventDefault()
        return false
      })
      document.querySelector('#show-article').addEventListener('copy', e => {
        e.preventDefault()
        return false
      })
      document.querySelector('#show-article').addEventListener('cut', e => {
        e.preventDefault()
        return false
      })
      document.querySelector('#show-article').addEventListener('drag', e => {
        e.preventDefault()
        return false
      })
      document.querySelector('#show-article').addEventListener('drop', e => {
        e.preventDefault()
        return false
      })
      document.querySelector('#show-article').addEventListener('contextmenu', e => {
        e.preventDefault()
        return false
      })
      $('#show-article img').materialbox();
      document.title = result.data.title + ' | Go Blog'
      axios.get(`${BaseUrl}api/article-subscribe?user_subscribe_id=${result.data.user_id}`,{
        headers: this.state.headers
      }).then(result => {
        if(result.data.id){
          this.setState({statusSubscribe: 'Subscribed'})
        }
      })
    })
    this.fetchComment()
    this.fetchCheckFavorite()
    axios.get(`${BaseUrl}api/article-viewer?page=1&article_id=${this.props.match.params.id}`).then(result => {
      this.setState({'listuserview': result.data.data})
    })
  }
  fetchComment(){
    axios.get(`${BaseUrl}api/comment/${this.props.match.params.id}`).then(result => {
      this.setState({'comment': result.data.data, finishedComment:true})
    })
  }
  fetchCheckFavorite(){
    if(JSON.parse(window.localStorage.getItem('account'))){
      axios.get(`${BaseUrl}api/article-favorite?article_id=${this.props.match.params.id}`,{
        headers: {Authorization: JSON.parse(window.localStorage.getItem('account')).token}
      }).then(result => {
        if(result.data.id){
          this.setState({nameIconFavorite: 'favorite', statusFavorite: 'Favorited'})
        }
      })
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
  async addFavorite(){
    let favorite = await functionAction.favoriteArticle(this.props.match.params.id)
    if(favorite.response === 'error'){
      M.toast({html: 'Error'})
    }
    if(favorite.response === 'Added to favorite'){
      M.toast({html: favorite.response})
      this.setState({nameIconFavorite: 'favorite', statusFavorite: 'Favorited'})
    }
    if(favorite.response === 'Removed from favorite'){
      M.toast({html: favorite.response})
      this.setState({nameIconFavorite: 'favorite_border', statusFavorite: 'Favorite'})
    }
  }
  async uploadView(){
    if(JSON.parse(window.localStorage.getItem('account'))){
      await axios.post(`${BaseUrl}api/article-viewer`, {
        user_id: JSON.parse(window.localStorage.getItem('account')).data.id,
        article_id: this.props.match.params.id
      }, {headers: {Authorization: JSON.parse(window.localStorage.getItem('account')).token}}).then(result => {
        
      })
    }
  }
  addComment(){
    axios.post(`${BaseUrl}api/comment`, {
      article_id: this.props.match.params.id,
      comment: this.state.create_comment
    }, {headers: this.state.headers}).then(result => {
      M.toast({html: result.data.message})
      this.setState({create_comment: ''})
      this.fetchComment()
    })
  }
  handle(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value
    });
  }
  render() {
    if(this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return(
      <React.Fragment>
        <BreadCrumb data={[{url: '/', str: 'Article'}, {url: '/article/' + this.props.match.params.id, str: this.props.match.params.id}]} />
        <div id="modal-userview" className="modal bottom-sheet">
          <div className="modal-content">
            <h4>Viewers Articles</h4>
            <ul className="collection" style={{maxHeight: 700,overflow: 'auto'}}>
            {this.state.listuserview.length == 0 ? <p style={{paddingLeft: 10}}>Empty Comment</p>: ''}
            {
              this.state.listuserview.map((text,key) => {
                return(
                  <li key={key} className="collection-item avatar">
                    <img src={BaseUrl + 'api/usrfile/' + text.user_id + '/' + text.avatar} alt="" className="circle"/>
                    <Link to={'/profile/' + text.user_id} className="title black-text">{text.name}</Link>
                    <p>{text.created_at}</p>
                  </li>
                )
              })
            }
            </ul>
          </div>
          <div className="modal-footer">
            <a className="modal-close waves-effect waves-green btn-flat" style={{cursor: 'pointer'}}>Close</a>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m8">
            <div className="card-panel">
            {
              this.state.finishedArticle ?
              <ContextDATA.Consumer>
                {
                  result => (
                  <React.Fragment>
                    <div style={{marginTop:10}} className="row">
                      <div className="col s12 m3">
                        <img src={BaseUrl + 'api/usrfile/' + this.state.article.user_id + '/' + this.state.article.image} alt="avatar" className="responsive-img"/>
                      </div>
                      <div className="col s12 m9" id="detail-article">
                        <h5 className="m-0">{this.state.article.title}</h5>
                        <div style={{marginTop:10}} className="divider"/>
                        <small>{this.state.article.description}</small>
                        <p><small>{this.state.article.created_at}</small></p>
                      </div>
                      <div className="col s12" id="show-article" autoComplete="off" dangerouslySetInnerHTML={{ __html: this.state.article.content }}/>
                      <div className="fb-share-button" data-href={window.location.href} data-layout="button_count"></div>
                    </div>
                    <div className="divider"/>
                    <p>
                      <button className="btn waves-light waves-effect blue" data-target="modal-userview" className="btn modal-trigger"><i className="material-icons left">visibility</i>{this.state.listuserview.length}</button>
                      <button className="btn waves-light waves-effect red lighten-1"disabled={result.users.id ? result.users.id !== this.state.article.user_id? false: true: true} onClick={this.addFavorite} style={{marginLeft: 10}} id="add-favorite"><i className="material-icons left">{this.state.nameIconFavorite}</i>{this.state.statusFavorite}</button>
                    </p>
                    <div className="divider"/>
                    <div style={{marginTop:10}} className="row">
                      <div className="col s3">
                      {
                        this.state.article.user_id ? <img src={BaseUrl + 'api/usrfile/' + this.state.article.user_id + '/' + this.state.article.avatar} alt="avatar responsive-img" className="circle" width="100%"/>:''
                      }
                      </div>
                      <div className="col s9">
                        <p><Link to={'/profile/' + this.state.article.user_id} className="title black-text">{this.state.article.name}</Link></p>
                        <div className="divider"/>
                        <p className="black-text">
                          {
                            this.state.article.bio ? this.state.article.bio: 'Bio is not created by its users'
                          }
                        </p>
                        <div className="divider"/>
                        <button
                          disabled={result.users.id ? result.users.id !== this.state.article.user_id? false: true: true}
                          className="btn waves-light waves-effect blue mt-10px"
                          onClick={this.addSubscribe}
                        >{this.state.statusSubscribe}</button>
                        <ReportUser user_id={this.state.article.user_id} disabled={result.users.id ? result.users.id !== this.state.article.user_id? false: true: true}/>
                      </div>
                    </div>
                  </React.Fragment>
                  )
                }
              </ContextDATA.Consumer>
              :<Loader/>
            }
            </div>
          </div>
          <div className="col s12 m4">
            <ul className="collection" style={{maxHeight: 700}}>
            {
              this.state.finishedComment ?
              <React.Fragment>
                {
                  this.state.comment.length == 0 ? <p style={{paddingLeft: 10}}>No Data Comment</p>: ''
                }
                {
                  this.state.comment.map((text,key) => {
                    return(
                      <li key={key} className="collection-item avatar">
                        <img src={`${BaseUrl}api/usrfile/${text.user_id}/${text.avatar}`} alt="avatar" className="circle waves-light waves-light"/>
                        <Link to={'/profile/' + text.user_id} className="title black-text">{text.name}</Link>
                        <p style={{lineBreak: 'anywhere'}}>{text.comment}<br/><small>{text.created_at}</small></p>
                      </li>
                    )
                  })
                }
                </React.Fragment>
              :<Loader/>
            }
            </ul>
            <div className="row">
              <div className="input-field col s12">
                <textarea disabled={this.state.isAuth} id="textarea-comment" className="materialize-textarea" value={this.state.create_comment} name="create_comment" onChange={this.handle}></textarea>
                <label htmlFor="textarea-comment">Type Of Comment</label>
              </div>
              <div className="col s12">
                <button disabled={this.state.isAuth} className="btn waves-light waves-effect blue" onClick={this.addComment}>Submit<i className="material-icons right">send</i></button>
              </div>
              <ContextDATA.Consumer>
                {
                  result => (
                    result.users.role == 0 ?
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
          </div>
          <div className="col s12">
            <h6>Article Related</h6>
            {
              this.state.article.category_id ? <ArticleLoadCMP url={BaseUrl + 'api/article-category/' + this.state.article.category_id} query={"article_id=" + this.state.article.id} id_next="next_article_user"/>: ''
            }
            
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default ViewArticleCMP;