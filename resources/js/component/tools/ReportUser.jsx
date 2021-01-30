import React from 'react'
import axios from 'axios'
import BaseUrl from '../../tools/Base';

class ReportUser extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			category_report: '',
			description_report: '',
			isReport: false
		}
		this.addReport = this.addReport.bind(this)
		this.handle = this.handle.bind(this)
	}
	componentDidMount(){
		$('#modal-report').modal();
		var account = window.localStorage.getItem('account')
    if(account){
    	this.setState({
        headers: {Authorization: JSON.parse(account).token}
      })
			axios.get(`${BaseUrl}api/user-report?user_report_id=${this.props.user_id}`,{
	       headers: {Authorization: JSON.parse(account).token}
	    }).then(result => {
	      if(result.data.id || result.data.message == 'Access Denied'){
	        this.setState({isReport: true})
	      }
	    })
    }
	}
	handle(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value
    });
  }
	addReport(){
    axios.post(`${BaseUrl}api/user-report`, {
      user_report_id: this.props.user_id,
      category: this.state.category_report,
      description: this.state.description_report,
    }, {
      headers: this.state.headers
    }).then(result => {
    	this.setState({isReport: true})
      M.toast({html: result.data.message})
    })
  }
	render(){
		return(
			<React.Fragment>
				<div id="modal-report" className="modal">
          <div className="modal-content">
            <h4>Report the users</h4>
            <div className="row">
              <div className="input-field col s12">
                <select className="browser-default" disabled={this.state.isReport} defaultValue="Choose your option" name="category_report" onChange={this.handle}>
                  <option value="Choose your option" disabled={true}>Choose your option</option>
                  <option value="Use Profanity">Use Profanity</option>
                  <option value="Hacking">Hacking</option>
                  <option value="Contains Negative">Contains Negative</option>
                  <option value="Bullying">Bullying</option>
                </select>
                <label className="active">The Problem</label>
              </div>
              <div className="input-field col s12">
                <textarea disabled={this.state.isReport} className="materialize-textarea" name="description_report" onChange={this.handle}></textarea>
                <label className={this.state.isReport ? 'active': ''}>Description</label>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button disabled={this.state.isReport} className="waves-effect waves-white blue btn" onClick={this.addReport}><i className="material-icons right">send</i>Submit</button>
          </div>
        </div>
        <button
          disabled={this.props.disabled}
          className="btn waves-light waves-effect red modal-trigger mt-10px"
          data-target="modal-report"
        >Report</button>
			</React.Fragment>	
		)
	}
}
export default ReportUser;