import React from 'react';
import {
  Link,
} from "react-router-dom";
import axios from 'axios';
import BaseUrl from '../../tools/Base';

Array.prototype.random = function(){
  return this[Math.floor(Math.random()*this.length)];
}

class Slider extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			popular: [],
			align: ['center-align', 'left-align', 'right-align']
		}
	}
	componentDidMount(){
		var url, headers = {};
    this.props.headers ? headers = {headers: {Authorization: JSON.parse(window.localStorage.getItem('account')).token}}:''
    if(this.props.query){
      url = `${this.props.url}?${this.props.query}&page=1&default=true`
    }
    else{
      url = `${this.props.url}?page=1&default=true`
    }
		axios.get(url, headers).then(result => {
      this.setState({popular: result.data.data})
      $('.slider').slider();
    })
	}
	render(){
		return(
		<div className="slider">
        <ul className="slides">
        {
          this.state.popular.map((data, key) => {
            return(
              <li key={key}>
                <img src={`${BaseUrl}api/usrfile/${data.user_id}/${data.image}`}/>
                <div className={"caption " + this.state.align.random()}>
                  <h3>{data.title}</h3>
                  <h5 className="light grey-text text-lighten-3">{data.description}</h5>
                  <Link className="light grey-text text-lighten-3" to={"/article/" + data.id}>Read More</Link>
                </div>
              </li>
            )
          })
        }
        </ul>
      </div>
		)
	}
}

export default Slider;