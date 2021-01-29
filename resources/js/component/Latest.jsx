import React from 'react';
import ArticleLoadCMP from './tools/ArticleLoadCMP.jsx';
import BaseUrl from '../tools/Base';
import BreadCrumb from './tools/BreadCrumb.jsx'

class LatestCMP extends React.Component{
  componentDidMount(){
    document.title = 'Latest Article | Go Blog'
  }
  render(){
    return(
      <React.Fragment>
        <BreadCrumb data={[{url: '/latest', str: 'Latest'}]} />
        <h5 className="ml-10px">Latest Article</h5>
        <ArticleLoadCMP query="latest=true" url={BaseUrl + 'api/article'} id_next="next_article"/>
      </React.Fragment>
    )
  }
}
export default LatestCMP;