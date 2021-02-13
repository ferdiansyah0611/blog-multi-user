import React from 'react';
import {
  Link,
  Redirect,
} from "react-router-dom";
import axios from 'axios';
import BreadCrumb from './tools/BreadCrumb.jsx'
import Datatables from './tools/Datatables.jsx';
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
      order_id: '',
      year: new Date().getFullYear()
    }
    this.showStatus = this.showStatus.bind(this)
    this.checkOrderId = this.checkOrderId.bind(this)
    this.handle = this.handle.bind(this)
  }
  componentDidMount() {
    document.title = 'Dashboard | Go Blog'
    google.charts.load("current", {packages:['corechart', 'bar']});
    $('.datepicker').datepicker({format:'yyyy'});
    let _this = this
    const ChartDashboard = () => {
      axios.get(BaseUrl + 'api/dashboard/' + this.state.year, {
        headers: {
          Authorization: JSON.parse(window.localStorage.getItem('account')).token
        }
      }).then(result => {
        google.charts.setOnLoadCallback(drawCharts);
        function drawCharts() {
          var data = google.visualization.arrayToDataTable([
            ['Month', 'Viewers', 'Subscriber'],
            ['Jan', result.data.viewers['jan'] ? result.data.viewers['jan']: 0, result.data.subscribers['jan'] ? result.data.subscribers['jan']: 0],
            ['Feb', result.data.viewers['feb'] ? result.data.viewers['feb']: 0, result.data.subscribers['feb'] ? result.data.subscribers['feb']: 0],
            ['Mar', result.data.viewers['mar'] ? result.data.viewers['mar']: 0, result.data.subscribers['mar'] ? result.data.subscribers['mar']: 0],
            ['Apr', result.data.viewers['apr'] ? result.data.viewers['apr']: 0, result.data.subscribers['apr'] ? result.data.subscribers['apr']: 0],
            ['May', result.data.viewers['may'] ? result.data.viewers['may']: 0, result.data.subscribers['may'] ? result.data.subscribers['may']: 0],
            ['Jun', result.data.viewers['jun'] ? result.data.viewers['jun']: 0, result.data.subscribers['jun'] ? result.data.subscribers['jun']: 0],
            ['Jul', result.data.viewers['jul'] ? result.data.viewers['jul']: 0, result.data.subscribers['jul'] ? result.data.subscribers['jul']: 0],
            ['Aug', result.data.viewers['aug'] ? result.data.viewers['aug']: 0, result.data.subscribers['aug'] ? result.data.subscribers['aug']: 0],
            ['Sep', result.data.viewers['sep'] ? result.data.viewers['sep']: 0, result.data.subscribers['sep'] ? result.data.subscribers['sep']: 0],
            ['Oct', result.data.viewers['oct'] ? result.data.viewers['oct']: 0, result.data.subscribers['oct'] ? result.data.subscribers['oct']: 0],
            ['Nov', result.data.viewers['nov'] ? result.data.viewers['nov']: 0, result.data.subscribers['nov'] ? result.data.subscribers['nov']: 0],
            ['Dec', result.data.viewers['dec'] ? result.data.viewers['dec']: 0, result.data.subscribers['dec'] ? result.data.subscribers['dec']: 0]
          ]);
          var options = {
            chart: {
              title: 'Data Analytics',
              subtitle: 'Viewers & Subscriber ' + _this.state.year,
            },
            bars: 'vertical'
          };
          var chart = new google.charts.Bar(document.getElementById('chart-statistic'));chart.draw(data, google.charts.Bar.convertOptions(options))
        };
      }).catch(e => console.log(e))
    }
    const ChartStorage = () => {
      axios.get(`${BaseUrl}api/storage/usage`,{headers: {Authorization: JSON.parse(window.localStorage.getItem('account')).token}}).then(result => {
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
          var data = google.visualization.arrayToDataTable([
            ['Name', 'Total'],
            ['Usage', result.data.usage],
            ['Remain', result.data.remain],
          ]);
          var options = {
            legend: 'none',
          };
          var chart = new google.visualization.PieChart(document.getElementById('chart-storage'));
          chart.draw(data, options);
        }
      })
    }
    var account = window.localStorage.getItem('account')
    if(account){
      $('#modal-show-status').modal()
      ChartDashboard()
      ChartStorage()
      $('.datepicker').change(e => {this.setState({year: e.target.value});ChartDashboard()})
      $('#refresh-chart-storage').click(e => {e.preventDefault();ChartStorage()})
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
      <BreadCrumb data={[{url: '/dashboard', str: 'Dashboard'}]} />
      <ContextDATA.Consumer>
      {
        result => (
          <React.Fragment>
            <div className="row">
              <div className="col s12 m6 l3 waves-effect waves-dark">
                <div className={result.ui.navbar.bg ? result.ui.navbar.bg + " lighten-1 center white-text card-panel z-depth-0": "blue lighten-1 center white-text card-panel z-depth-0"}>
                  <i className="material-icons" style={{fontSize: 50}}>notes</i>
                  <h6 style={{marginTop:0}}>Article</h6>
                  <p><b>{this.state.totalArticle}</b></p>
                </div>
              </div>
              <div className="col s12 m6 l3 waves-effect waves-dark">
                <div className={result.ui.navbar.bg ? result.ui.navbar.bg + " lighten-1 center white-text card-panel z-depth-0": "blue lighten-1 center white-text card-panel z-depth-0"}>
                  <i className="material-icons" style={{fontSize: 50}}>comment</i>
                  <h6 style={{marginTop:0}}>Comment</h6>
                  <p><b>{this.state.totalComment}</b></p>
                </div>
              </div>
              <div className="col s12 m6 l3 waves-effect waves-dark">
                <div className={result.ui.navbar.bg ? result.ui.navbar.bg + " lighten-1 center white-text card-panel z-depth-0": "blue lighten-1 center white-text card-panel z-depth-0"}>
                  <i className="material-icons" style={{fontSize: 50}}>favorite</i>
                  <h6 style={{marginTop:0}}>Favorite</h6>
                  <p><b>{this.state.totalFavorite}</b></p>
                </div>
              </div>
              <div className="col s12 m6 l3 waves-effect waves-dark">
                <div className={result.ui.navbar.bg ? result.ui.navbar.bg + " lighten-1 center white-text card-panel z-depth-0": "blue lighten-1 center white-text card-panel z-depth-0"}>
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
                      <div className={result.ui.navbar.bg ? "card-image " + result.ui.navbar.bg: "card-image blue"} style={{height: 80}}>   
                        <span className="card-title">Statistic</span>
                      </div>
                      <div className="card-content overflow-auto">
                        <div id="chart-statistic" style={{width: '100%',height: 'auto'}}></div>
                      </div>
                      <div className="card-action">
                        <input type="text" className="datepicker" placeholder="Set year"/>
                      </div>
                    </div>
                  </div>
                  <div className="col s12 m4">
                    <div className="card">
                      <div className={result.ui.navbar.bg ? "card-image " + result.ui.navbar.bg: "card-image blue"} style={{height: 80}}>   
                        <span className="card-title">Storage</span>
                      </div>
                      <div className="card-content overflow-auto">
                        <div id="chart-storage" style={{width: '100%',height: 'auto'}}></div>
                      </div>
                      <div className="card-action">
                        <a href="#" id="refresh-chart-storage" className={"btn waves-effect waves-light w-100 center-align lighten-1 " + result.ui.navbar.bg} style={{marginTop:5}}>
                          <span>Refresh</span> <i className="material-icons right">refresh</i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col s12 m4">
                <div className="card" id="card-profile">
                  <div className="card-image waves-effect waves-block waves-light">
                    {
                      result.ui.sidebar.cover ? <img className="activator" src={result.ui.sidebar.cover} alt="user background"/>:
                      <img className="activator" src="https://images.unsplash.com/photo-1606044466411-207a9a49711f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHw%3D&auto=format&fit=crop&w=300&q=60" alt="user background"/>
                    }
                  </div>
                  <div className="card-content">
                    {
                      result.users.avatar ? <img src={BaseUrl + 'api/usrfile/' + result.users.id + '/' + result.users.avatar} alt="" className="circle responsive-img activator profile-image"/>:''
                    }
                    <p className="col s12"><span className="left">Name</span><span className="right">{result.users.name}</span></p>
                    <p className="col s12"><span className="left">Email</span><span className="right">{result.users.email}</span></p>
                    <p className="col s12"><span className="left">Location</span><span className="right">{result.users.location}</span></p>
                    <Link to={"/profile/" + result.users.id} className={"btn waves-effect waves-light w-100 center-align lighten-1 " + result.ui.navbar.bg} style={{marginTop:5}}>
                      <span>Go to profile</span> <i className="material-icons right">send</i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col s12 m8">
                <div className="card">
                  <div className={result.ui.navbar.bg ? "card-image " + result.ui.navbar.bg: "card-image blue"} style={{height: 80}}>   
                    <span className="card-title">Payment</span>
                  </div>
                  <div className="card-content">
                    {
                      this.state.payment.length === 0 ? <p className="center-align" style={{marginTop:30}}>Not have a payment</p>:
                      <div style={{maxHeight:400, overflow: 'auto'}}>
                      <table className="highlight">
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
                        </tbody>
                      </table>
                      </div>
                    }
                  </div>
                  <div className="card-action">
                    <input type="text" name="order_id" onChange={this.handle} />
                    <button className="btn blue waves-effect waves-light" onClick={this.checkOrderId}>Check Order ID</button>
                  </div>
                </div>
              </div>
              <div className="col s12">
                <div className="card">
                  <div className={result.ui.navbar.bg ? "card-image " + result.ui.navbar.bg: "card-image blue"} style={{height: 80}}>   
                    <span className="card-title">My Article</span>
                  </div>
                  <div className="card-content overflow-auto">
                    <Datatables
                        hasArticle={true}
                        paginate={true}
                        heading={
                          ['#', 'Title', 'Created']
                        }
                        td={
                          ['id', 'title', 'created_at']
                        }
                        url={{
                          default: BaseUrl + 'api/article',
                          deleted: BaseUrl + 'api/article/',
                          edited: BaseUrl + 'api/article/',
                          search: BaseUrl + 'api/search/article'
                        }}
                        form={
                          ['id', 'category_id', 'title', 'description', 'content', 'status', 'updated_at']
                        }
                        type={[false,'number-disabled','text', 'textarea', 'textareatinymce', 'select|public,private', false]}
                      />
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        )
      }
      </ContextDATA.Consumer>
      </React.Fragment>
    )
  }
}

export default DashboardCMP;