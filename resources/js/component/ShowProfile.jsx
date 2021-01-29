import React from 'react'
import {
  Link,
  Redirect,
} from "react-router-dom";
import axios from 'axios';
import BreadCrumb from './tools/BreadCrumb.jsx';
import Datatables from './tools/Datatables.jsx';
import ArticleLoadCMP from './tools/ArticleLoadCMP.jsx';
import Loader from './tools/Loader.jsx';
/*tools*/
import BaseUrl from '../tools/Base';
import errorStatusCode from '../tools/errorStatusCode';
import print from '../tools/print';
/*context*/
import ContextDATA from '../ContextDATA';

class ShowProfileCMP extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      users: {},
      finished: false,
      found: false
    }
  }
  componentDidMount(){
    this.fetchAPI()
    $('.parallax').parallax();
  }
  componentDidUpdate(prevProp){
    if(this.props.match.params.id !== prevProp.match.params.id){
      this.fetchAPI()
    }
  }
  async fetchAPI(paginate = 1){
    await axios.get(`${BaseUrl}api/user/${this.props.match.params.id}`).then(result => {
      document.title = result.data.name + ' | Go BLog'
      this.setState({
        'users': result.data,
        found: true,
        finished: true
      })
      $('.parallax').parallax();
    })
  }
  render() {
    return(
      <React.Fragment>
      {
        this.state.found ?
        <React.Fragment>
        <div className="parallax-container default">
          <div className="parallax">
            <img src="https://images.unsplash.com/photo-1606044466411-207a9a49711f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHw%3D&auto=format&fit=crop&w=600&q=60"/>
          </div>
          <div className="row">
            <div className="col s12">
                <div className="row">
                  <div className="col s12">
                    <div className="center-align">
                      <img style={{maxWidth: '100%', maxHeight: 167}} className="circle waves-effect waves-light" src={`${BaseUrl}api/usrfile/${this.props.match.params.id}/${this.state.users.avatar}`}/>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div className="card-content">
          <div className="row">
            <div className="col s12 m8 offset-m2 white z-depth-1" style={{marginTop:'-100px'}}>
              <div className="black-text">
                <h5>{this.state.users.name}</h5>
                <div className="divider"/>
                <p className="black-text">{this.state.users.bio == null ? 'Bio is not created by its users': this.state.users.bio}</p>
                <div className="divider"/>
                <div className="row mt-10px">
                  <div className="col s11">
                  <ContextDATA.Consumer>
                    {
                      result => (
                        result.users.id === this.state.users.id || !result.users.id ?
                          <React.Fragment>
                            <button disabled={true} className="btn waves-light waves-effect blue">Subscribe</button>
                            <button disabled={true} className="btn waves-light waves-effect red" style={{marginLeft: 10}}>Report</button>
                          </React.Fragment>
                        :
                        <React.Fragment>
                          <button className="btn waves-light waves-effect blue">Subscribe</button>
                          <button className="btn waves-light waves-effect red" style={{marginLeft: 10}}>Report</button>
                        </React.Fragment>
                      )
                    }
                  </ContextDATA.Consumer>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h5 style={{marginLeft:10}}>Post Blog</h5>
          {
            this.state.users.id ? <ArticleLoadCMP url={BaseUrl + 'api/article'} query={"users=" + this.state.users.id} id_next="next_article"/>:''
          }
        </div>
        </React.Fragment>
        :''
      }
      {
        this.state.finished ? '': <Loader/>
      }
      </React.Fragment>
    )
  }
}
export default ShowProfileCMP;