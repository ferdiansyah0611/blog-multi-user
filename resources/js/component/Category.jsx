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
    	}
    }
  }
  componentDidMount(){
  	axios.get(BaseUrl + 'api/category?name=' + this.props.match.params.name).then(result => {
  		this.setState({category: result.data})
  	})
  }
  render(){
  	return(
  		<React.Fragment>
  			<BreadCrumb data={[{url: '/category', str: 'Category'}, {url: '/' + this.props.match.params.name, str: this.props.match.params.name}]} />
  			<h5 className="ml-10px">Category {this.props.match.params.name}</h5>
  			<blockquote className="ml-10px">{this.state.category.description}</blockquote>
  			<ArticleLoadCMP url={BaseUrl + 'api/article'} id_next="next_article_category" query={"category=" + this.props.match.params.name}/>
  		</React.Fragment>
  	)
  }
}
export default Category