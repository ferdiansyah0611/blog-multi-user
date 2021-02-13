import React from 'react';
import {
  Link,
} from "react-router-dom";
import axios from 'axios';
import Config from '../Config';
import Loader from './tools/Loader.jsx';
import ArticleLoadCMP from './tools/ArticleLoadCMP.jsx';
import ColsArticleCMP from './tools/ColsArticleCMP.jsx';
import BaseUrl from '../tools/Base';
import BreadCrumb from './tools/BreadCrumb.jsx'
import Slider from './tools/Slider.jsx';
/*context*/
import ContextDATA from '../ContextDATA';

class Category extends React.Component{
	static contextType = ContextDATA;
  constructor(props){
    super(props)
    this.state = {
    	category: {
    		name:'',
    		description:''
    	},
      article: [],
      paginate: 1,
      finished: false,
    }
    this.nextArticle = this.nextArticle.bind(this)
  }
  componentDidMount(){
    document.title = this.props.match.params.name + ' | Go Blog'
  	axios.get(BaseUrl + 'api/category?name=' + this.props.match.params.name).then(result => {
  		this.setState({category: result.data})
  	})
    var url
    url = `${BaseUrl}api/article?category=${this.props.match.params.name}&page=1&default=true`
    axios.get(url).then(result => {
      this.setState({
        article: result.data.data,
        finished: true
      })
    })
  }
  componentDidUpdate(prefProps){
    if(prefProps.match.params.name !== this.props.match.params.name){
      this.componentDidMount()
    }
  }
  nextArticle(e){
    this.setState({finished: false})
    document.querySelector('#' + 'next_article_category').setAttribute('disabled', true)
    axios.get(`${BaseUrl}api/article?category=${this.props.match.params.name}&page=1&default=true`).then(result => {
      if(result.data.data.length >= 1){
        this.setState({paginate: this.state.paginate + 1})
        this.setState({
          article: [...this.state.article, ...result.data.data],
          finished: true
        })
        document.querySelector('#' + 'next_article_category').removeAttribute('disabled')
      }if(result.data.data.length == 0){
        this.setState({finished: true})
        document.querySelector('#' + 'next_article_category').removeAttribute('disabled')
      }
    })
  }
  render(){
  	return(
  		<React.Fragment>
  			<BreadCrumb data={[{url: '/category', str: 'Category'}, {url: '/' + this.props.match.params.name, str: this.props.match.params.name}]} />
  			<h5 className="ml-10px">Category {this.props.match.params.name}</h5>
  			<blockquote className="ml-10px">{this.state.category.description}</blockquote>
        {
  			 /*<ArticleLoadCMP url={BaseUrl + 'api/article'} id_next="next_article_category" query={"category=" + this.props.match.params.name}/>*/

        }

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
        {
          this.state.finished ? this.state.article.length == 0 ? <p className="center-align">No Data</p>:'': <Loader/>
        }
        {
          this.state.finished === 'error' ? <h6 className="center">Data Not found</h6>: ''
        }
        {
          this.state.article.length !== 0 ? 
          <div className="center-align mb-10px">
            <a id='next_article_category' className="waves-effect waves-light blue btn" style={{marginLeft:5}} onClick={this.nextArticle}><i className="material-icons right">expand_more</i>Load More</a>
          </div>
          :''
        }
        </React.Fragment>
  		</React.Fragment>
  	)
  }
}
export default Category