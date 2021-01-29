import React from 'react';
import {
  Link,
} from "react-router-dom";
import LazyImage from './LazyImage.jsx';
import functionAction from './FunctionAction';

class ColsArticleCMP extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      views: ''
    }
    this.actionFavorite = this.actionFavorite.bind(this)
  }
  async actionFavorite(e){
    if(JSON.parse(window.localStorage.getItem('account'))) {
      let favorite = await functionAction.favoriteArticle(this.props.data.id)
      favorite.response !== 'error' ? M.toast({html: favorite.response}): M.toast({html: 'Error'})
    }else{
      M.toast({html: 'Sorry you must be logged in to do this. <a href="#/login" class="btn blue" style="margin-left:10px;">Login</a>'})
    }
  }
  componentDidMount(){
    if(this.props.data.views > 1000 && this.props.data.views < 1000000){
      this.setState({views: parseInt(this.props.data.views / 1000) + 'k'})
    }
    if(this.props.data.views > 1000000){
      this.setState({views: parseInt(this.props.data.views / 1000000) + 'm'})
    }else{
      this.setState({views: this.props.data.views})
    }
  }
  render() {
    return(
      <div className="col s12 m4 l4 list-article">
        <div className="card hoverable">
          <div className="card-image waves-effect waves-dark">
            <LazyImage
              srcset={this.props.data.image}
              src="https://placehold.it/200x300?text=Image12"
              alt="images"
            />
            <span className="card-title">{this.props.data.title}</span>
          </div>
          <div className="card-content">
            <button className="btn btn-floating red waves-effect waves-light favorite" onClick={this.actionFavorite}>
              <i className="material-icons">favorite</i>
            </button>
            <button className="btn btn-floating cyan waves-effect waves-light share activator"><i className="material-icons">share</i></button>
            <button className="btn btn-floating white waves-effect waves-light avatar-user"><img className="responsive-img" src={this.props.data.avatar} alt="avatar"/></button>
            <p className="line-auto">{this.props.data.description}</p>
            <p className="row">
              <span className="left"><b>Publish</b></span>
              <span className="right fs-12px">{this.props.data.created_at}</span>
            </p>
            <p className="row">
              <span className="left"><b>Viewers</b></span>
              <span className="right fs-12px">{this.props.data.views}</span>
            </p>
            <p className="row">
              <span className="left"><b>By</b></span>
              <span className="right fs-12px"><Link to={'/profile/' + this.props.data.user_id} className="blue-text waves-effect waves-dark">{this.props.data.author}</Link></span>
            </p>
          </div>
          <div className="card-action">
            <button className="btn btn-small blue"  onClick={() => window.location.hash = '/article/' + this.props.data.id}><i className="material-icons right">arrow_forward</i>Read More</button>
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
  }
}
export default ColsArticleCMP;