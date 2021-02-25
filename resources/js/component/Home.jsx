import React from 'react';
import {
  Link,
} from "react-router-dom";
import axios from 'axios';
import Config from '../Config';
import ArticleLoadCMP from './tools/ArticleLoadCMP.jsx';
import BaseUrl from '../tools/Base';
import BreadCrumb from './tools/BreadCrumb.jsx'
import Slider from './tools/Slider.jsx';
import Loader from './tools/Loader.jsx';
/*context*/
import ContextDATA from '../ContextDATA';

class Home extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      users: [],
      users2: [],
      p_users: 1,
      p_users2: 1,
      finishedUser: false,
      finishedUser2: false,
    }
    this.nextRecommend = this.nextRecommend.bind(this)
  }
  componentDidMount(){
    document.title = 'Home Pages | Go Blog'
    axios.get(BaseUrl + 'api/user?random=true&page=' + this.state.p_users).then(result => {
      this.setState({users: result.data.data, finishedUser: true})
    })
    axios.get(BaseUrl + 'api/user?random=true&page=' + this.state.p_users2).then(result => {
      this.setState({users2: result.data.data, finishedUser2: true})
    })
    $('.carousel.carousel-slider').carousel({
      fullWidth: true,
      indicators: true
    });
  }
  nextRecommend(e){
    e.target.dataset.type == '1' ?
    axios.get(BaseUrl + 'api/user?random=true&page=' + (this.state.p_users + 1)).then(result => {
      this.setState({users: result.data.data, p_users: this.state.p_users + 1})
    })
    :
    axios.get(BaseUrl + 'api/user?random=true&page=' + (this.state.p_users2 + 1)).then(result => {
      this.setState({users2: result.data.data, p_users2: this.state.p_users2 + 1})
    })
  }
  render(){
    return(
      <React.Fragment>
        <BreadCrumb data={[{url: '/', str: 'Home'}]} />
        <Slider url={`${BaseUrl}api/article`} query="popular=true"  />
        <ContextDATA.Consumer>
          {
            result => (
              <React.Fragment>
                <h5 className="ml-10px">Article</h5>
                <ArticleLoadCMP url={BaseUrl + 'api/article'} id_next="next_article"/>
                <div className="row">
                {
                  !result.users || result.users.role == 0 ?
                  <React.Fragment>
                    <div className="col s12 m6">
                      <div class="carousel carousel-slider center">
                        <div class="carousel-fixed-item center">
                          <a class="btn waves-effect white grey-text darken-text-2">button</a>
                        </div>
                        <div class="carousel-item red white-text" href="#one!">
                          <h2>First Adsense</h2>
                          <p class="white-text">This is your first Adsense</p>
                        </div>
                        <div class="carousel-item amber white-text" href="#two!">
                          <h2>Second Adsense</h2>
                          <p class="white-text">This is your second Adsense</p>
                        </div>
                        <div class="carousel-item green white-text" href="#three!">
                          <h2>Third Adsense</h2>
                          <p class="white-text">This is your third Adsense</p>
                        </div>
                        <div class="carousel-item blue white-text" href="#four!">
                          <h2>Fourth Adsense</h2>
                          <p class="white-text">This is your fourth Adsense</p>
                        </div>
                      </div>
                    </div>
                    <div className="col s12 m6">
                      <div class="carousel carousel-slider center">
                        <div class="carousel-fixed-item center">
                          <a class="btn waves-effect white grey-text darken-text-2">button</a>
                        </div>
                        <div class="carousel-item red white-text" href="#one!">
                          <h2>First Adsense</h2>
                          <p class="white-text">This is your first Adsense</p>
                        </div>
                        <div class="carousel-item amber white-text" href="#two!">
                          <h2>Second Adsense</h2>
                          <p class="white-text">This is your second Adsense</p>
                        </div>
                        <div class="carousel-item green white-text" href="#three!">
                          <h2>Third Adsense</h2>
                          <p class="white-text">This is your third Adsense</p>
                        </div>
                        <div class="carousel-item blue white-text" href="#four!">
                          <h2>Fourth Adsense</h2>
                          <p class="white-text">This is your fourth Adsense</p>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                    : false
                }
                  <div className="col s12 m6">
                    <ul className="collection with-header">
                      <li className="collection-header">
                        <h5>People</h5>
                      </li>
                      {
                        this.state.finishedUser ?
                          this.state.users.map((data, key) => {
                            return(
                              <li className="collection-item avatar" key={key}>
                                <img className="circle" src={data.avatar.length == 0 ? data.gender == 'pria' || data.gender == 'male' ? Config.users.avatarDefault: Config.users.avatarDefaultGirl: BaseUrl + 'api/usrfile/' + data.id + '/' + data.avatar} />
                                <span className="title"><Link to={'/profile/' + data.id}>{data.name}</Link></span>
                                <p>{data.bio ? data.bio: 'Bio is not created by its users'}</p>
                              </li>
                            )
                          })
                          : <Loader/>
                      }
                    </ul>
                    <div className="center-align mb-10px">
                      <a className="waves-effect waves-light blue btn" style={{marginLeft:5}} onClick={this.nextRecommend} data-type="1"><i className="material-icons right" data-type="1">arrow_right</i>Next</a>
                    </div>
                  </div>
                  <div className="col s12 m6">
                    <ul className="collection with-header">
                      <li className="collection-header">
                        <h5>People</h5>
                      </li>
                      {
                        this.state.finishedUser2 ?
                          this.state.users2.map((data, key) => {
                            return(
                              <li className="collection-item avatar" key={key}>
                                <img className="circle" src={data.avatar.length == 0 ? data.gender == 'pria' || data.gender == 'male' ? Config.users.avatarDefault: Config.users.avatarDefaultGirl: BaseUrl + 'api/usrfile/' + data.id + '/' + data.avatar} />
                                <span className="title"><Link to={'/profile/' + data.id}>{data.name}</Link></span>
                                <p>{data.bio ? data.bio: 'Bio is not created by its users'}</p>
                              </li>
                            )
                          })
                          : <Loader/>
                      }
                    </ul>
                    <div className="center-align mb-10px">
                      <a className="waves-effect waves-light blue btn" style={{marginLeft:5}} onClick={this.nextRecommend} data-type="2"><i className="material-icons right" data-type="2">arrow_right</i>Next</a>
                    </div>
                  </div>
                </div>
                {
                  result.users.id ?
                    <React.Fragment>
                      <h5 className="ml-10px">My Subscribe</h5>
                        <ArticleLoadCMP url={BaseUrl + 'api/article-subscribe'} id_next="next_article_subscribe" query="pagination=true" headers={true}/>
                      </React.Fragment>
                  : false
                }
              </React.Fragment>
            )
          }
        </ContextDATA.Consumer>
      </React.Fragment>
    )

  }
}

export default Home;