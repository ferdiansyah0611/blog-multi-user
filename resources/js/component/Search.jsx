import React from 'react';
import {
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import ColsArticleCMP from './tools/ColsArticleCMP.jsx';
import BaseUrl from '../tools/Base';
import BreadCrumb from './tools/BreadCrumb.jsx'

import axios from 'axios';
/*tools*/
import errorStatusCode from '../tools/errorStatusCode';
import print from '../tools/print';

class SearchCMP extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      article: {
        data:[],
        total:''
      },
      users: {
        data:[],
        total:''
      },
      paginate: 1,
      search: ''
    }
    this.handle = this.handle.bind(this)
    this.nextArticle = this.nextArticle.bind(this)
  }
  componentDidMount(){
    document.title = 'Search: ' + this.props.match.params.search + ' | Go Blog'
    this.fetch()
  }
  fetch(){
      axios.get(`${BaseUrl}api/article?page=${1}&search=${this.props.match.params.search}`).then(result => {
        this.setState({
          article: result.data,
          search: this.props.match.params.search
        })
      })
      axios.get(`${BaseUrl}api/user?page=${1}&search=${this.props.match.params.search}`).then(result => {
        this.setState({
          users: result.data,
        })
      })

  }
  componentDidUpdate(prefProps){
    if(prefProps.match.params.search !== this.props.match.params.search){
      this.componentDidMount()
    }
  }
  handle(){
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value
    });
  }
  nextArticle(e){
    if(e.target.id == 'next-article'){
      document.querySelector('#next-article').setAttribute('disabled', true)
      axios.get(`${BaseUrl}api/article?page=${this.state.paginate + 1}&search=${this.props.match.params.search}`).then(result => {
        if(result.data.data.length >= 1){
          this.setState({paginate: this.state.paginate + 1})
          this.setState({
            'article': {
              data: [...this.state.article.data, ...result.data.data],
              total: result.data.total
            }
          })
          document.querySelector('#next-article').removeAttribute('disabled')
        }if(result.data.data.length == 0){
          document.querySelector('#next-article').removeAttribute('disabled')
        }
      })
    }
    if(e.target.id == 'next-users'){
      document.querySelector('#next-users').setAttribute('disabled', true)
      axios.get(`${BaseUrl}api/user?page=${this.state.paginate + 1}&search=${this.props.match.params.search}`).then(result => {
        if(result.data.data.length >= 1){
          this.setState({paginate: this.state.paginate + 1})
          this.setState({
            'users': {
              data: [...this.state.article.data, ...result.data.data],
              total: result.data.total
            }
          })
          document.querySelector('#next-users').removeAttribute('disabled')
        }if(result.data.data.length == 0){
          document.querySelector('#next-users').removeAttribute('disabled')
        }
      })
    }
  }
  render(){
    return(
      <React.Fragment>
        <BreadCrumb data={[{url: '/search', str: 'Search'}]} />
                  <h5 className="ml-10px">Article</h5>
                  <div className="row">
                  {
                    this.state.article.data.map((text, key) => {
                      return(
                        <ColsArticleCMP key={key} data={{
                          id: text.id,
                          user_id: text.user_id,
                          title: text.title,
                          description: text.description,
                          author: text.name,
                          views: text.views,
                          image: `${BaseUrl}api/usrfile/${text.user_id}/${text.image}`
                        }}/>
                      )
                    })
                  }
                  </div>
                  {
                    this.state.article.data.length !== 0 ?
                    <React.Fragment>
                    <p className="ml-10px">Total Result: {this.state.article.total}</p>
                    <div className="center-align mb-10px">
                      <a id="next-article" className="waves-effect waves-light blue btn ml-5px" onClick={this.nextArticle}><i className="material-icons right">expand_more</i>Load More</a>
                    </div>
                    </React.Fragment>
                    :<p className="center-align m-100px">Article Does Not Exist</p>
                  }
                  <h6 className="ml-10px">User</h6>
                  <div className="divider"/>
                  <div className="row">
                    {
                      this.state.users.data.map((data, key) => {
                        return(
                        <div className="col s12 m4 l3" key={key}>
                          <div className="card hoverable">
                            <div className="card-image">
                              <img src={`${BaseUrl}api/usrfile/${data.id}/${data.avatar}`}/>
                              <span className="card-title">{data.name}</span>
                            </div>
                            <div className="card-content">
                              <p>{data.bio}</p>
                            </div>
                            <div className="card-action">
                              <Link to={"/profile/" + data.id} className="blue-text waves-effect waves-dark">View Profile</Link>
                            </div>
                          </div>
                        </div>
                        )
                      })
                    }
                  </div>
                  {
                    this.state.users.data.length !== 0 ?
                    <React.Fragment>
                    <p style={{marginLeft: 10}}>Total Result: {this.state.users.total}</p>
                    <div className="center-align mb-10px">
                      <a id="next-users" className="waves-effect waves-light blue btn" style={{marginLeft:5}} onClick={this.nextArticle}><i className="material-icons right">expand_more</i>Load More</a>
                    </div>
                    </React.Fragment>
                    :<p className="center-align m-100px">Users Does Not Exist</p>
                  }
      </React.Fragment>
    )
  }
}
export default SearchCMP;