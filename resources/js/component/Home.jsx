import React from 'react';
import ArticleLoadCMP from './tools/ArticleLoadCMP.jsx';
import BaseUrl from '../tools/Base';
import BreadCrumb from './tools/BreadCrumb.jsx'

const Home = () => {
  document.title = 'Home Pages | Go Blog'
  return(
    <React.Fragment>
      <BreadCrumb data={[{url: '/', str: window.location.origin}, {url: '/', str: 'Home'}]} />
      <h5 className="ml-10px">Article</h5>
      <ArticleLoadCMP url={BaseUrl + 'api/article'} id_next="next_article"/>
      <h5 className="ml-10px">My Subscribe</h5>
      <ArticleLoadCMP url={BaseUrl + 'api/article'} id_next="next_article"/>
    </React.Fragment>
  )
}

export default Home;