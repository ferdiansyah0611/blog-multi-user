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
  const pay = (e) => {
    var account = window.localStorage.getItem('account')
    $('.tooltipped').tooltip();
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
    }
  }
  React.useEffect(() => {
    document.title = 'Premium Feature'
  })
  return (
    <div className="row mt-10px">
      <div className="col s12">
        <div className="row">
        <ContextDATA.Consumer>
          {
            result => (
              <React.Fragment>
              <div className="col s12 m3">
                <div className={result.users.id ? 'card-panel': 'card-panel tooltipped'} data-position="bottom" data-tooltip="Login Before Payment">
                  <img className="w-100" src="https://images.unsplash.com/photo-1606044466411-207a9a49711f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHw%3D&auto=format&fit=crop&w=300&q=60"/>
                  <h5>Packet Normal</h5>
                  <div className="divider"/>
                  <blockquote>
                    <p>100 MB Storage</p>
                    <p>Maximum 250 Article</p>
                    <p>24 Hours Customer Service</p>
                    <p>No Ads</p>
                    <p>30 Days</p>
                  </blockquote>
                  <button disabled={result.users.id ? false: true} className="btn blue waves-effect waves-light w-100" data-type="1" onClick={pay}>Rp. 49.000</button>
                </div>
              </div>
              <div className="col s12 m3">
                <div className={result.users.id ? 'card-panel': 'card-panel tooltipped'} data-position="bottom" data-tooltip="Login Before Payment">
                  <img className="w-100" src="https://images.unsplash.com/photo-1606044466411-207a9a49711f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHw%3D&auto=format&fit=crop&w=300&q=60"/>
                  <h5>Packet Personal</h5>
                  <div className="divider"/>
                  <blockquote>
                    <p>500 MB Storage</p>
                    <p>Maximum 1500 Article</p>
                    <p>24 Hours Customer Service</p>
                    <p>No Ads</p>
                    <p>90 Days</p>
                  </blockquote>
                  <button disabled={result.users.id ? false: true} className="btn blue waves-effect waves-light w-100" data-type="2" onClick={pay}>Rp. 156.000</button>
                </div>
              </div>
              <div className="col s12 m3">
                <div className={result.users.id ? 'card-panel': 'card-panel tooltipped'} data-position="bottom" data-tooltip="Login Before Payment">
                  <img className="w-100" src="https://images.unsplash.com/photo-1606044466411-207a9a49711f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHw%3D&auto=format&fit=crop&w=300&q=60"/>
                  <h5>Packet Blogger</h5>
                  <div className="divider"/>
                  <blockquote>
                    <p>1 GB Storage</p>
                    <p>No Limited Article</p>
                    <p>24 Hours Customer Service</p>
                    <p>No Ads</p>
                    <p>180 Days</p>
                  </blockquote>
                  <button disabled={result.users.id ? false: true} className="btn blue waves-effect waves-light w-100" data-type="3" onClick={pay}>Rp. 200.000</button>
                </div>
              </div>
              <div className="col s12 m3">
                <div className={result.users.id ? 'card-panel': 'card-panel tooltipped'} data-position="bottom" data-tooltip="Login Before Payment">
                  <img className="w-100" src="https://images.unsplash.com/photo-1606044466411-207a9a49711f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHw%3D&auto=format&fit=crop&w=300&q=60"/>
                  <h5>Packet Bussiness</h5>
                  <div className="divider"/>
                  <blockquote>
                    <p>2 GB Storage</p>
                    <p>No Limited Article</p>
                    <p>24 Hours Customer Service</p>
                    <p>No Ads</p>
                    <p>365 Days</p>
                  </blockquote>
                  <button disabled={result.users.id ? false: true} className="btn blue waves-effect waves-light w-100" data-type="4" onClick={pay}>Rp. 300.000</button>
                </div>
              </div>
              </React.Fragment>
            )
          }
        </ContextDATA.Consumer>
        </div>
      </div>
    </div>
  )
}
export default PremiumCMP;