import React from 'react'
import {
  Link,
  Redirect,
} from "react-router-dom";
import axios from 'axios';
import BreadCrumb from './tools/BreadCrumb.jsx'
/*tools*/
import BaseUrl from '../tools/Base';
import errorStatusCode from '../tools/errorStatusCode';
import print from '../tools/print';
/*context*/
import ContextDATA from '../ContextDATA';

var account = window.localStorage.getItem('account')

class PremiumCMP extends React.Component{
  static contextType = ContextDATA;
  constructor(props){
    super(props)
    this.state = {
      pay: {
        days: '0 days',
        storage: '0 mb',
        price: 0,
        expired_at: '1990-01-01'
      },
      url: BaseUrl + 'api/pay/me',
      price: {
        '1': {
          days: "+0 days",
          price: "0",
          storage: "0 Mb Storage",
        },
        '2': {
          days: "+0 days",
          price: "0",
          storage: "0 Mb Storage",
        },
        '3': {
          days: "+0 days",
          price: "0",
          storage: "0 Mb Storage",
        },
        '4': {
          days: "+0 days",
          price: "0",
          storage: "0 Mb Storage",
        }
      }
    }
    this.pay = this.pay.bind(this)
  }
  pay(e){
    if(account && this.context.users.id){
      axios.get(`${BaseUrl}api/pay?type=${e.target.dataset.type}`, {
        headers: {Authorization: JSON.parse(account).token}
      }).then(result => {
        snap.pay(result.data.token, {
          onSuccess: (result) => {
            axios.post(`${BaseUrl}api/pay`, result, {
              headers: {Authorization: JSON.parse(account).token}
            }).then(response => {
              M.toast({html: result.status_message})
            })
          },
          onPending: (result) => {
          },
          onError: (result) => {
          },
        });
      })
    }else{
      this.setState({redirect: '/login'})
    }
  }
  componentDidMount(){
    document.title = 'Premium | Go Blog'
    axios.get(BaseUrl + 'api/price').then(result => {
      this.setState({price: result.data})
    })
    if(account && this.context.users.type !== '0')
    {
      axios.get(this.state.url, {
        headers: {Authorization: JSON.parse(account).token, 'X-CSRF-TOKEN': document.querySelector('meta[name="X-CSRF-TOKEN"]').getAttribute('content')}
      }).then(result => {
        this.setState({pay: result.data})
      })
    }
  }
  render(){
    const state = this.state
    return(
      <ContextDATA.Consumer>
    {
      result => (
        <>
        {
          !result.users.type || result.users.type == 0 ?
            <div className="row mt-10px">
              <div className="col s12">
                <div className="card-panel z-depth-0">
                  <img src={BaseUrl + 'img/4989917.jpg'} className="responsive-img"/>
                  <h4 className="center-align">
                    <b>Start Your Success With US</b>
                  </h4>
                  <div className="divider"></div>
                  <p className="center-align">Select the member package and enjoy all its features!</p>
                  <div className="row">
                    <div className="col s12 m3" style={{padding:0}}>
                      <div className="card-panel hoverable">
                        <h6><b>Packet Normal</b></h6>
                        <div className="divider"/>
                        <div style={{fontFamily:'serif'}}>
                          <p>
                            <label>
                              <input type="checkbox" defaultChecked={true} disabled={true}/>
                              <span className="black-text">{state.price[1].storage}</span>
                            </label>
                          </p>
                          <p>
                            <label>
                              <input type="checkbox" defaultChecked={true} disabled={true}/>
                              <span className="black-text">Maximum 250 Article</span>
                            </label>
                          </p>
                          
                          <p>
                            <label>
                              <input type="checkbox" defaultChecked={true} disabled={true}/>
                              <span className="black-text">Remove Ads</span>
                            </label>
                          </p>
                          <p>
                            <label>
                              <input type="checkbox" defaultChecked={true} disabled={true}/>
                              <span className="black-text">Unlimited Email Assistance</span>
                            </label>
                          </p>
                          <p>
                            <label>
                              <input type="checkbox" defaultChecked={true} disabled={true}/>
                              <span className="black-text">{state.price[1].days}</span>
                            </label>
                          </p>
                          <p>
                            <label>
                              <input type="checkbox" checked={false} disabled/>
                              <span className="black-text">24 Hours CS</span>
                            </label>
                          </p>
                          <p>
                            <label>
                              <input type="checkbox" checked={false} disabled/>
                              <span className="black-text">Earn Revenue From Advertising</span>
                            </label>
                          </p>
                        </div>
                        <button
                          disabled={result.users.type && result.users.type == 0 ? false: true}
                          className="btn blue waves-effect waves-light w-100"
                          data-type="1"
                          onClick={this.pay}
                        >{state.price[1].price.split('.00')[0]}
                        </button>
                      </div>
                    </div>
                    <div className="col s12 m3" style={{padding:0}}>
                      <div className="card-panel hoverable">
                        <h6><b>Packet Personal</b></h6>
                        <div className="divider"/>
                        <div style={{fontFamily:'serif'}}>
                          <p>
                            <label>
                              <input type="checkbox" defaultChecked={true} disabled={true}/>
                              <span className="black-text">{state.price[2].storage}</span>
                            </label>
                          </p>
                          <p>
                            <label>
                              <input type="checkbox" defaultChecked={true} disabled={true}/>
                              <span className="black-text">Maximum 1500 Article</span>
                            </label>
                          </p>
                          
                          <p>
                            <label>
                              <input type="checkbox" defaultChecked={true} disabled={true}/>
                              <span className="black-text">Remove Ads</span>
                            </label>
                          </p>
                          <p>
                            <label>
                              <input type="checkbox" defaultChecked={true} disabled={true}/>
                              <span className="black-text">Unlimited Email Assistance</span>
                            </label>
                          </p>
                          <p>
                            <label>
                              <input type="checkbox" defaultChecked={true} disabled={true}/>
                              <span className="black-text">{state.price[2].days}</span>
                            </label>
                          </p>
                          <p>
                            <label>
                              <input type="checkbox" defaultChecked={true} disabled={true}/>
                              <span className="black-text">24 Hours CS</span>
                            </label>
                          </p>
                          <p>
                            <label>
                              <input type="checkbox" defaultChecked={true} disabled={true}/>
                              <span className="black-text">Earn Revenue From Advertising</span>
                            </label>
                          </p>
                        </div>
                        <button
                          disabled={result.users.type && result.users.type == 0 ? false: true}
                          className="btn blue waves-effect waves-light w-100"
                          data-type="2"
                          onClick={this.pay}
                        >{state.price[2].price.split('.00')[0]}
                        </button>
                      </div>
                    </div>
                    <div className="col s12 m3" style={{padding:0}}>
                      <div className="card-panel hoverable">
                        <h6><b>Packet Blogger</b></h6>
                        <div className="divider"/>
                        <div style={{fontFamily:'serif'}}>
                          <p>
                            <label>
                              <input type="checkbox" defaultChecked={true} disabled={true}/>
                              <span className="black-text">{state.price[3].storage}</span>
                            </label>
                          </p>
                          <p>
                            <label>
                              <input type="checkbox" defaultChecked={true} disabled={true}/>
                              <span className="black-text">No Limited Article</span>
                            </label>
                          </p>
                          <p>
                            <label>
                              <input type="checkbox" defaultChecked={true} disabled={true}/>
                              <span className="black-text">Remove Ads</span>
                            </label>
                          </p>
                          <p>
                            <label>
                              <input type="checkbox" defaultChecked={true} disabled={true}/>
                              <span className="black-text">Unlimited Email Assistance</span>
                            </label>
                          </p>
                          <p>
                            <label>
                              <input type="checkbox" defaultChecked={true} disabled={true}/>
                              <span className="black-text">{state.price[3].days}</span>
                            </label>
                          </p>
                          <p>
                            <label>
                              <input type="checkbox" defaultChecked={true} disabled={true}/>
                              <span className="black-text">24 Hours CS</span>
                            </label>
                          </p>
                          <p>
                            <label>
                              <input type="checkbox" defaultChecked={true} disabled={true}/>
                              <span className="black-text">Earn Revenue From Advertising</span>
                            </label>
                          </p>
                        </div>
                        <button
                          disabled={result.users.type && result.users.type == 0 ? false: true}
                          className="btn blue waves-effect waves-light w-100"
                          data-type="3"
                          onClick={this.pay}
                        >{state.price[3].price.split('.00')[0]}
                        </button>
                      </div>
                    </div>
                    <div className="col s12 m3" style={{padding:0}}>
                      <div className="card-panel hoverable">
                        <h6><b>Packet Bussiness</b></h6>
                        <div className="divider"/>
                        <div style={{fontFamily:'serif'}}>
                          <p>
                            <label>
                              <input type="checkbox" defaultChecked={true} disabled={true}/>
                              <span className="black-text">{state.price[4].storage}</span>
                            </label>
                          </p>
                          <p>
                            <label>
                              <input type="checkbox" defaultChecked={true} disabled={true}/>
                              <span className="black-text">No Limited Article</span>
                            </label>
                          </p>
                          <p>
                            <label>
                              <input type="checkbox" defaultChecked={true} disabled={true}/>
                              <span className="black-text">Remove Ads</span>
                            </label>
                          </p>
                          <p>
                            <label>
                              <input type="checkbox" defaultChecked={true} disabled={true}/>
                              <span className="black-text">Unlimited Email Assistance</span>
                            </label>
                          </p>
                          <p>
                            <label>
                              <input type="checkbox" defaultChecked={true} disabled={true}/>
                              <span className="black-text">{state.price[4].days}</span>
                            </label>
                          </p>
                          <p>
                            <label>
                              <input type="checkbox" defaultChecked={true} disabled={true}/>
                              <span className="black-text">24 Hours CS</span>
                            </label>
                          </p>
                          <p>
                            <label>
                              <input type="checkbox" defaultChecked={true} disabled={true}/>
                              <span className="black-text">Earn Revenue From Advertising</span>
                            </label>
                          </p>
                        </div>
                        <button
                          disabled={result.users.type && result.users.type == 0 ? false: true}
                          className="btn blue waves-effect waves-light w-100"
                          data-type="4"
                          onClick={this.pay}
                        >{state.price[4].price.split('.00')[0]}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="center-align">
                    <h4><b>Why choose Go Blog?</b></h4>
                    <p>We make blogging easy without coding and provide complete tools. Registration is free !!!</p>
                    <div className="row">
                      <div className="col s12 m6">
                        <img src={BaseUrl + 'img/3593987.jpg'} className="responsive-img"/>
                      </div>
                      <div className="col s12 m6">
                        <div className="row hover-red">
                          <div className="col s12 m6 center-align">
                            <div className="card-panel white black-text hoverable">
                              <h5>Beautiful Themes</h5>
                              <p>The interface is perfect for the user</p>
                            </div>
                          </div>
                          <div className="col s12 m6 center-align">
                            <div className="card-panel white black-text hoverable">
                              <h5>Big Data Storage</h5>
                              <p>We provide large storage to create your blog</p>
                            </div>
                          </div>
                          <div className="col s12 m6 center-align">
                            <div className="card-panel white black-text hoverable">
                              <h5>99% Uptime & Online</h5>
                              <p>Our website is always online 99% every twenty four hours</p>
                            </div>
                          </div>
                          <div className="col s12 m6 center-align">
                            <div className="card-panel white black-text hoverable">
                              <h5>Free For All Times</h5>
                              <p>We always provide free services for free but with limitations</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="center-align"><b>How to buy Premium?</b></h4>
                    <div className="row">
                      <div className="col s12 m6">
                        <div className="row hover-red">
                          <div className="col s12 m6 center-align">
                            <div className="card-panel white black-text hoverable">
                              <h5>1</h5>
                              <p>Register & Login to your account</p>
                            </div>
                          </div>
                          <div className="col s12 m6 center-align">
                            <div className="card-panel white black-text hoverable">
                              <h5>2</h5>
                              <p>Select your packet premium</p>
                            </div>
                          </div>
                          <div className="col s12 m6 center-align">
                            <div className="card-panel white black-text hoverable">
                              <h5>3</h5>
                              <p>Go to page dashboard and check order id</p>
                            </div>
                          </div>
                          <div className="col s12 m6 center-align">
                            <div className="card-panel white black-text hoverable">
                              <h5>4</h5>
                              <p>Sucessfully buy a premium</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col s12 m6">
                        <img src={BaseUrl + 'img/3593965.jpg'} className="responsive-img"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            :
            <>
            <BreadCrumb data={[{url: '/premium', str: 'Premium'}]} />
            <div className="row">
              <div className="col s12">
                <div className="card">
                  <div className={result.ui.navbar.bg + " card-image card-image"} style={{height: 80}}>   
                    <span className={result.ui.navbar.txt + " card-title"}>My Premium</span>
                  </div>
                  <div className="card-content">
                    <h5 className="center-align">Enjoy premium features however you like</h5>
                    <div className="row">
                      <div className="col s12 m3">
                        <div className="card-panel center">
                          <i className="material-icons" style={{fontSize: 50}}>paid</i>
                          <h6 style={{marginTop:0}}>Pays</h6>
                          <p><b>{"Rp. " + Number(state.pay.price)}</b></p>
                        </div>
                      </div>
                      <div className="col s12 m3">
                        <div className="card-panel center">
                          <i className="material-icons" style={{fontSize: 50}}>date_range</i>
                          <h6 style={{marginTop:0}}>Days</h6>
                          <p><b>{state.pay.days}</b></p>
                        </div>
                      </div>
                      <div className="col s12 m3">
                        <div className="card-panel center">
                          <i className="material-icons" style={{fontSize: 50}}>folder</i>
                          <h6 style={{marginTop:0}}>Storage</h6>
                          <p><b>{state.pay.storage}</b></p>
                        </div>
                      </div>
                      <div className="col s12 m3">
                        <div className="card-panel center">
                          <i className="material-icons" style={{fontSize: 50}}>event</i>
                          <h6 style={{marginTop:0}}>Expired</h6>
                          <p><b>{state.pay.expired_at}</b></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </>
        }
        </>
      )
    }
    </ContextDATA.Consumer>
    )
  }
}
export default PremiumCMP;