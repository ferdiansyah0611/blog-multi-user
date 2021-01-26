import React from 'react';
import ArticleLoadCMP from './tools/ArticleLoadCMP.jsx';
import BaseUrl from '../tools/Base';
import BreadCrumb from './tools/BreadCrumb.jsx'

class PopularCMP extends React.Component{
  componentDidMount(){
    document.title = 'Popular Article'
  }
  render(){
    return(
      <React.Fragment>
        <BreadCrumb data={[{url: '/', str: window.location.origin}, {url: '/popular', str: 'Popular'}]} />
        <h5 className="ml-10px">Popular Article</h5>
        <ArticleLoadCMP query="popular=16" url={BaseUrl + 'api/article'} id_next="next_article"/>
      </React.Fragment>
    )
  }
}
export default PopularCMP;