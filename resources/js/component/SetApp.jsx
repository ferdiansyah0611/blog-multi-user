import React from 'react';
import {
  Link,
  Redirect,
} from "react-router-dom";
import axios from 'axios';
import BreadCrumb from './tools/BreadCrumb.jsx';
/*tools*/
import BaseUrl from '../tools/Base';
import errorStatusCode from '../tools/errorStatusCode';
import print from '../tools/print';
/*context*/
import ContextDATA from '../ContextDATA';

class SetAppCMP extends React.Component {
	componentDidMount(){
		document.title = 'Setting App | Go Blog'
		$('select.form-select').formSelect();
	}
	render(){
		return(
			<>
				<BreadCrumb data={[{url: '/setting/apps', str: 'Setting apps'}]} />
        <div className="container">
          <form className="row">
          	<ContextDATA.Consumer>
              {
                context => (
                <>
                	<div className="col s12">
                    <div className="card">
                      <div class="card-image blue" style={{height: 80}}>   
                        <span class="card-title">Application</span>
                      </div>
                      <div className="card-content">
                        <div className="row">
	                        <div class="input-field col s12">
												    <select className="form-select">
												      <option value="" disabled selected>Choose</option>
												      <option value="5">5 Minutes</option>
												      <option value="10">10 Minutes</option>
												      <option value="15">15 Minutes</option>
												      <option value="30">30 Minutes</option>
												    </select>
												    <label>Refresh Rate Data</label>
												  </div>
												  <div class="input-field col s12">
												    <select className="form-select">
												      <option value="" disabled selected>Choose</option>
												      <option value="5">5 Minutes</option>
												      <option value="10">10 Minutes</option>
												      <option value="15">15 Minutes</option>
												      <option value="30">30 Minutes</option>
												    </select>
												    <label>Cache Data</label>
												  </div>
                        </div>
                      </div>
                    </div>
                   </div>
                </>
                )
              }
             </ContextDATA.Consumer>
          </form>
         </div>
			</>
		)
	}
}
export default SetAppCMP;