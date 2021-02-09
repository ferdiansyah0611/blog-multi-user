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
const PremiumCMP = (props) => {
  const [state, setState] = React.useState({})
  const pay = (e) => {
    var account = window.localStorage.getItem('account')
    if(account){
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
      setState({redirect: '/login'})
    }
  }
  React.useEffect(() => {
    document.title = 'Premium Feature | Go Blog'
  })
  if(state.redirect){
    return <Redirect to={state.redirect} />
  }
  return (
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
                <div style={{fontFamily:'ui-monospace'}}>
                  <p>
                    <label>
                      <input type="checkbox" defaultChecked={true}/>
                      <span>100 MB Storage</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input type="checkbox" defaultChecked={true}/>
                      <span>Maximum 250 Article</span>
                    </label>
                  </p>
                  
                  <p>
                    <label>
                      <input type="checkbox" defaultChecked={true}/>
                      <span>Remove Ads</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input type="checkbox" defaultChecked={true}/>
                      <span>Unlimited Email Assistance</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input type="checkbox" defaultChecked={true}/>
                      <span>30 Days</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input type="checkbox" checked={false} disabled/>
                      <span>24 Hours CS</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input type="checkbox" checked={false} disabled/>
                      <span>Earn Revenue From Advertising</span>
                    </label>
                  </p>
                </div>
                <button className="btn blue waves-effect waves-light w-100" data-type="1" onClick={pay}>Rp. 49.000</button>
              </div>
            </div>
            <div className="col s12 m3" style={{padding:0}}>
              <div className="card-panel hoverable">
                <h6><b>Packet Personal</b></h6>
                <div className="divider"/>
                <div style={{fontFamily:'ui-monospace'}}>
                  <p>
                    <label>
                      <input type="checkbox" defaultChecked={true}/>
                      <span>500 MB Storage</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input type="checkbox" defaultChecked={true}/>
                      <span>Maximum 1500 Article</span>
                    </label>
                  </p>
                  
                  <p>
                    <label>
                      <input type="checkbox" defaultChecked={true}/>
                      <span>Remove Ads</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input type="checkbox" defaultChecked={true}/>
                      <span>Unlimited Email Assistance</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input type="checkbox" defaultChecked={true}/>
                      <span>90 Days</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input type="checkbox" defaultChecked={true}/>
                      <span>24 Hours CS</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input type="checkbox" defaultChecked={true}/>
                      <span>Earn Revenue From Advertising</span>
                    </label>
                  </p>
                </div>
                <button className="btn blue waves-effect waves-light w-100" data-type="2" onClick={pay}>Rp. 156.000</button>
              </div>
            </div>
            <div className="col s12 m3" style={{padding:0}}>
              <div className="card-panel hoverable">
                <h6><b>Packet Blogger</b></h6>
                <div className="divider"/>
                <div style={{fontFamily:'ui-monospace'}}>
                  <p>
                    <label>
                      <input type="checkbox" defaultChecked={true}/>
                      <span>1 GB Storage</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input type="checkbox" defaultChecked={true}/>
                      <span>No Limited Article</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input type="checkbox" defaultChecked={true}/>
                      <span>Remove Ads</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input type="checkbox" defaultChecked={true}/>
                      <span>Unlimited Email Assistance</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input type="checkbox" defaultChecked={true}/>
                      <span>180 Days</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input type="checkbox" defaultChecked={true}/>
                      <span>24 Hours CS</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input type="checkbox" defaultChecked={true}/>
                      <span>Earn Revenue From Advertising</span>
                    </label>
                  </p>
                </div>
                <button className="btn blue waves-effect waves-light w-100" data-type="3" onClick={pay}>Rp. 200.000</button>
              </div>
            </div>
            <div className="col s12 m3" style={{padding:0}}>
              <div className="card-panel hoverable">
                <h6><b>Packet Bussiness</b></h6>
                <div className="divider"/>
                <div style={{fontFamily:'ui-monospace'}}>
                  <p>
                    <label>
                      <input type="checkbox" defaultChecked={true}/>
                      <span>2 GB Storage</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input type="checkbox" defaultChecked={true}/>
                      <span>No Limited Article</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input type="checkbox" defaultChecked={true}/>
                      <span>Remove Ads</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input type="checkbox" defaultChecked={true}/>
                      <span>Unlimited Email Assistance</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input type="checkbox" defaultChecked={true}/>
                      <span>365 Days</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input type="checkbox" defaultChecked={true}/>
                      <span>24 Hours CS</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input type="checkbox" defaultChecked={true}/>
                      <span>Earn Revenue From Advertising</span>
                    </label>
                  </p>
                </div>
                <button className="btn blue waves-effect waves-light w-100" data-type="4" onClick={pay}>Rp. 300.000</button>
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
                <div className="row" id="hover-red">
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
        </div>
      </div>
      <div className="col s12">
      </div>
    </div>
  )
}
export default PremiumCMP;