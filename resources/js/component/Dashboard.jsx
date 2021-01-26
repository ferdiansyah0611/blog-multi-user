import React from 'react';
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

class DashboardCMP extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      users: '',
      redirect: '',
      totalArticle: '0',
      totalComment: '0',
      totalFavorite: '0',
      totalSubscribe: '0',
      payment: [],
      statusPay: {},
      order_id: ''
    }
    this.showStatus = this.showStatus.bind(this)
    this.checkOrderId = this.checkOrderId.bind(this)
    this.handle = this.handle.bind(this)
  }
  componentDidMount() {
    document.title = 'Dashboard | Go Blog'
    const ChartDashboard = () => {
      var ctx = document.getElementById('chart-statistic').getContext('2d');
      var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              datasets: [{
                  label: '# of Viewers',
                  data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
      });
    }
    const ChartStorage = () => {
      var ctx = document.getElementById('chart-storage').getContext('2d');
      axios.get(`${BaseUrl}api/storage/usage`,{headers: {Authorization: JSON.parse(window.localStorage.getItem('account')).token}}).then(result => {
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Usage', 'Remain'],
                datasets: [{
                    data: [result.data.usage,result.data.remain],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
      })
    }
    var account = window.localStorage.getItem('account')
    if(account){
      $('#modal-show-status').modal()
      ChartDashboard()
      ChartStorage()
      axios.get(`${BaseUrl}api/article?total=true`, {headers: {Authorization: JSON.parse(account).token}}).then(result => {
        this.setState({totalArticle: result.data.total})
      })
      axios.get(`${BaseUrl}api/comment?total=true`, {headers: {Authorization: JSON.parse(account).token}}).then(result => {
        this.setState({totalComment: result.data.total})
      })
      axios.get(`${BaseUrl}api/article-favorite?total=true`, {headers: {Authorization: JSON.parse(account).token}}).then(result => {
        this.setState({totalFavorite: result.data.total})
      })
      axios.get(`${BaseUrl}api/article-subscribe?total=true`, {headers: {Authorization: JSON.parse(account).token}}).then(result => {
        this.setState({totalSubscribe: result.data.total})
      })
      axios.get(`${BaseUrl}api/pay?paginate=true`, {headers: {Authorization: JSON.parse(account).token}}).then(result => {
        this.setState({payment: result.data.data})
      })
    }
  }
  showStatus(e){
    axios.get(`${BaseUrl}api/pay/status/${e.target.dataset.id}`, {headers: {Authorization: JSON.parse(window.localStorage.getItem('account')).token}}).then(result => {
      this.setState({statusPay: result.data})
      $('#modal-show-status').modal('open')
    })
  }
  checkOrderId(e){
    this.state.order_id.length > 1 ?
    axios.get(`${BaseUrl}api/pay/check/${this.state.order_id}`, {headers: {Authorization: JSON.parse(window.localStorage.getItem('account')).token}}).then(result => {
      result.data.status === 200 ? Swal.fire('Successfuly',result.data.message,'success'): Swal.fire('Warning',result.data.message,'warning')
    })
    :''
  }
  handle(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  render() {
    if(this.state.redirect || !window.localStorage.getItem('account')) {
      return this.state.redirect ? <Redirect to={this.state.redirect} />: <Redirect to="/login?destination=/dashboard" />
    }
    return(
      <React.Fragment>
      <div id="modal-show-status" className="modal">
        <div className="modal-content">
            <table className="striped responsive-table highlight">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Transaction ID</th>
                  <th>Price</th>
                  <th>Transaction Status</th>
                  <th>Date</th>
                  <th>Masked Card</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.statusPay.order_id}</td>
                  <td>{this.state.statusPay.transaction_id}</td>
                  <td>Rp. {parseInt(this.state.statusPay.gross_amount)}</td>
                  <td>{this.state.statusPay.transaction_status}</td>
                  <td>{this.state.statusPay.transaction_time}</td>
                  <td>{this.state.statusPay.masked_card}</td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
      <BreadCrumb data={[{url: '/', str: 'Home'}, {url: '/dashboard', str: 'Dashboard'}]} />
      <div className="row">
        <div className="col s12 m6 l3 waves-effect waves-dark">
          <div className="blue lighten-1 center white-text card-panel z-depth-0">
            <i className="material-icons" style={{fontSize: 50}}>notes</i>
            <h6 style={{marginTop:0}}>Article</h6>
            <p><b>{this.state.totalArticle}</b></p>
          </div>
        </div>
        <div className="col s12 m6 l3 waves-effect waves-dark">
          <div className="blue lighten-1 center white-text card-panel z-depth-0">
            <i className="material-icons" style={{fontSize: 50}}>comment</i>
            <h6 style={{marginTop:0}}>Comment</h6>
            <p><b>{this.state.totalComment}</b></p>
            
          </div>
        </div>
        <div className="col s12 m6 l3 waves-effect waves-dark">
          <div className="blue lighten-1 center white-text card-panel z-depth-0">
            <i className="material-icons" style={{fontSize: 50}}>favorite</i>
            <h6 style={{marginTop:0}}>Favorite</h6>
            <p><b>{this.state.totalFavorite}</b></p>
            
          </div>
        </div>
        <div className="col s12 m6 l3 waves-effect waves-dark">
          <div className="blue lighten-1 center white-text card-panel z-depth-0">
            <i className="material-icons" style={{fontSize: 50}}>subscriptions</i>
            <h6 style={{marginTop:0}}>Subscriber</h6>
            <p><b>{this.state.totalSubscribe}</b></p>
            
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <div className="row">
            <div className="col s12 m8">
              <div className="card">
                <div className="card-content">
                  <h5>Statistic Viewers</h5>
                  <div className="divider"/>
                  <canvas id="chart-statistic" width="auto" height="400"></canvas>
                </div>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="card" id="card-profile">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src="https://images.unsplash.com/photo-1606044466411-207a9a49711f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHw%3D&auto=format&fit=crop&w=300&q=60" alt="user background"/>
                </div>
                <div className="card-content">
                <ContextDATA.Consumer>
                {
                  result => (
                    <React.Fragment>
                    <img src={BaseUrl + 'api/usrfile/' + result.users.id + '/' + result.users.avatar} alt="" className="circle responsive-img activator profile-image"/>
                    <p className="col s12"><span className="left">Name</span><span className="right">{result.users.name}</span></p>
                    <p className="col s12"><span className="left">Email</span><span className="right">{result.users.email}</span></p>
                    <p className="col s12"><span className="left">Location</span><span className="right">{result.users.location}</span></p>
                    <Link to={"/profile/" + result.users.id} className="btn waves-effect waves-light w-100 center-align" style={{marginTop:5}}>
                      <span>Go to profile</span> <i className="material-icons right">send</i>
                    </Link>
                    </React.Fragment>
                  )
                }
                </ContextDATA.Consumer>
                </div>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="card">
                <div className="card-content">
                  <h5>Storage</h5>
                  <div className="divider" style={{marginBottom:10}}/>
                  <canvas id="chart-storage" width="auto" height="400"></canvas>
                </div>
              </div>
            </div>
          </div>
            <div className="col s12 m4">
              <div className="card-panel">
                <h5>My Payment</h5>
                <div className="divider" style={{marginBottom:10}}/>
                {
                  this.state.payment.length === 0 ? <p className="center-align" style={{marginTop:30}}>Not have a payment</p>:
                  <div style={{maxHeight:400, overflow: 'auto'}}>
                  <table className="responsive-table highlight">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Order ID</th>
                        <th style={{cursor:'pointer'}}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.payment.map((text, key) => {
                          return(
                            <tr key={key}>
                              <td>{text.id}</td>
                              <td>{text.order_id}</td>
                              <td>
                                <button type="button" data-id={text.order_id} className="btn blue" onClick={this.showStatus}>Status</button>
                              </td>
                            </tr>
                          )
                        })
                      }
                        <div className="divider"/>
                        <p>Check Order ID to Validation Premium</p>
                        <input type="text" name="order_id" onChange={this.handle} />
                        <button className="btn blue waves-effect waves-light" onClick={this.checkOrderId}>Check</button>
                    </tbody>
                  </table>
                  </div>
                }
              </div>
            </div>
        </div>
      </div>
      </React.Fragment>
    )
  }
}

export default DashboardCMP;