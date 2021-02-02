import React from 'react';
import {
  Link,
} from "react-router-dom";
import axios from 'axios';
import ArticleLoadCMP from './tools/ArticleLoadCMP.jsx';
import BaseUrl from '../tools/Base';
import BreadCrumb from './tools/BreadCrumb.jsx'
import Slider from './tools/Slider.jsx';
/*context*/
import ContextDATA from '../ContextDATA';

class Home extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      users: []
    }
  }
  componentDidMount(){
    document.title = 'Home Pages | Go Blog'
    axios.get(BaseUrl + 'api/user?random=true').then(result => {
      this.setState({users: result.data.data})
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
                  <div className="col s12 m6">
                    <ul className="collection with-header">
                      <li className="collection-header"><h4>Category</h4></li>
                      {
                        result.category.map((data, key) => {
                          return(
                            <li className="collection-item avatar" key={key}>
                              <i className="material-icons circle">folder</i>
                              <span className="title"><Link to={'/category/' + data.name}>{data.name}</Link></span>
                              <p>{data.description}</p>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </div>
                  <div className="col s12 m6">
                    <ul className="collection with-header">
                      <li className="collection-header">
                        <h4>Recommended People</h4>
                      </li>
                      {
                        this.state.users.map((data, key) => {
                          return(
                            <li className="collection-item avatar" key={key}>
                              <img className="circle" src={BaseUrl + 'api/usrfile/' + data.id + '/' + data.avatar} />
                              <span className="title"><Link to={'/profile/' + data.id}>{data.name}</Link></span>
                              <p>{data.bio ? data.bio: 'Bio is not created by its users'}</p>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </div>
                </div>
                {
                  result.users.id ?
                    <React.Fragment>
                      <h5 className="ml-10px">My Subscribe</h5>
                        <ArticleLoadCMP url={BaseUrl + 'api/article-subscribe'} id_next="next_article_subscribe" query="paginate=true" headers={true}/>
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