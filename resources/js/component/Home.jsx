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
  }
  componentDidMount(){
    document.title = 'Home Pages | Go Blog'
  }
  render(){
    return(
      <React.Fragment>
        <BreadCrumb data={[{url: '/', str: 'Home'}]} />
        <Slider url={`${BaseUrl}api/article`} query="popular=true"  />
        <h5 className="ml-10px">Article</h5>
        <ArticleLoadCMP url={BaseUrl + 'api/article'} id_next="next_article"/>
        <ContextDATA.Consumer>
          {
            result => (
              result.users.id ?
                <React.Fragment>
                  <h5 className="ml-10px">My Subscribe</h5>
                  <ArticleLoadCMP url={BaseUrl + 'api/article-subscribe'} id_next="next_article_subscribe" query="paginate=true" headers={true}/>
                </React.Fragment>
              : false
            )
          }
        </ContextDATA.Consumer>
      </React.Fragment>
    )

  }
}

export default Home;