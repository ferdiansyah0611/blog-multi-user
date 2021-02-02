import React from 'react';
import {
  Link,
} from "react-router-dom";
import ContextDATA from '../../ContextDATA';

class Navbar extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			search: 'hide',
			navmobile: 'hide-on-med-and-down',
			showonsmall: 'show-on-small',
			inputsearch: ''
		}
		this.search = this.search.bind(this)
		this.openSearch = this.openSearch.bind(this)
		this.closeSearch = this.closeSearch.bind(this)
		this.handle = this.handle.bind(this)
	}
	search(e){
		e.preventDefault()
		window.location.href = '/#/search/' + this.state.inputsearch
	}
	openSearch(e){
		e.preventDefault()
		this.setState({search: '', navmobile: 'hide', showonsmall: 'hide'})
	}
	closeSearch(e){
		this.setState({
			search: 'hide',
			navmobile: 'hide-on-med-and-down',
			showonsmall: 'show-on-small'
		})
	}
	handle(e){
		this.setState({inputsearch: e.target.value})
	}
	componentDidMount(){
		$('.dropdown-trigger').dropdown();
	}
	render(){
		return(
			<ContextDATA.Consumer>
				{
					result => (
						<React.Fragment>
							<div className="navbar-fixed">
					    	<nav className={result.ui.navbar.bg}>
					    	  <div className="nav-wrapper">
					    	  <form className={this.state.search} id="search-data" onSubmit={this.search}>
						        <div className="input-field">
						          <input id="search" type="search" onKeyUp={this.handle}/>
						          <label className="label-icon" for="search"><i className="material-icons">search</i></label>
						          <i className="material-icons" onClick={this.closeSearch}>close</i>
						        </div>
						      </form>
					    	  	<div className="row">
					    	  		<div className="col s12">
								        <ul className={this.state.showonsmall}>
								         	<li>
								         		<button className="sidenav-trigger btn-small btn-flat white-text z-depth-0" data-target="slide-out"><i className="material-icons">menu</i></button>
								         	</li>
								          	<li>
								          	  	<Link to="/">Go Blog</Link>
								          	</li>
								            {
								            	result.users.id ?
								          		<li className="right">
									              <a className={result.ui.navbar.bg ? "dropdown-trigger btn-floating pulse darken-3 pointer " + result.ui.navbar.bg: "dropdown-trigger btn-floating pulse lighten-1 pointer"} data-target="dropdown-notification-mobile">
									              	<i className="material-icons left">notifications_none</i>
									              </a>
									              <a href="/search" className="btn-floating blue darken-2 z-depth-0 pointer" onClick={this.openSearch}>
									              	<i className="material-icons left">search</i>
									              </a>
									              <div id="dropdown-notification-mobile" className="dropdown-content z-depth-3">
														{
														  result.notification.length === 0 ? <p className="black-text center-align">No Notification</p>:
														  <ul className="collection" style={{border:'none !important'}}>
														  {
														    result.notification.map((data, key) => {
														      return(
														        <React.Fragment key={key}>
														        {
														          data.type == 'subscribe' ?
														            <li className={data.status == 'unread' ? 'collection-item avatar': 'collection-item avatar active'}>
														              <i className="material-icons circle red">subscriptions</i>
														              <span className={data.status == 'unread' ? 'title black-text': 'title white-text'}>Subscriptions</span>
														              <p className={data.status == 'unread' ? 'black-text': 'white-text'}>{data.message}</p>
														            </li>
														            :false
														        }
														        {
														          data.type == 'unsubscribe' ?
														            <li className={data.status == 'unread' ? 'collection-item avatar': 'collection-item avatar active'}>
														              <i className="material-icons circle red">unsubscribe</i>
														              <span className={data.status == 'unread' ? 'title black-text': 'title white-text'}>Unsubscribe</span>
														              <p className={data.status == 'unread' ? 'black-text': 'white-text'}>{data.message}</p>
														            </li>
														            :false
														        }
														        </React.Fragment>
														      )
														    })
														  }
														  </ul>
														}
													</div>
								            	</li>
								            	: 	<li className="right">
								          				<Link className="btn-small blue darken-2 z-depth-0" to="/login"><i className="material-icons">login</i></Link>
								          			</li>
								          		}
								        </ul>
								        <ul id="nav-mobile" className={"right " + this.state.navmobile}>
								          <li><a href="/search" onClick={this.openSearch}>Search<i className="material-icons left t-0">search</i></a></li>
								          <li><Link to="/popular">Popular<i className="material-icons left">view_quilt</i></Link></li>
								          <li><Link to="/latest">Latest<i className="material-icons left">sort_by_alpha</i></Link></li>
								          {
								            result.users.id ?
								            <li>
								              	<a className={result.ui.navbar.bg ? "dropdown-trigger btn-floating pulse darken-3 pointer " + result.ui.navbar.bg: "dropdown-trigger btn-floating pulse lighten-1 pointer"} data-target="dropdown-notification">
								              		<i className="material-icons left">notifications_none</i>
								              	</a>
												<div id="dropdown-notification" className="dropdown-content z-depth-3">
												{
												  result.notification.length === 0 ? <p className="black-text center-align">No Notification</p>:
												  <ul className="collection" style={{border:'none !important'}}>
												  {
												    result.notification.map((data, key) => {
												      return(
												        <React.Fragment key={key}>
												        {
												          data.type == 'subscribe' ?
												            <li className={data.status == 'unread' ? 'collection-item avatar': 'collection-item avatar active'}>
												              <i className="material-icons circle red">subscriptions</i>
												              <span className={data.status == 'unread' ? 'title black-text': 'title white-text'}>Subscriptions</span>
												              <p className={data.status == 'unread' ? 'black-text': 'white-text'}>{data.message}</p>
												            </li>
												            :false
												        }
												        {
												          data.type == 'unsubscribe' ?
												            <li className={data.status == 'unread' ? 'collection-item avatar': 'collection-item avatar active'}>
												              <i className="material-icons circle red">unsubscribe</i>
												              <span className={data.status == 'unread' ? 'title black-text': 'title white-text'}>Unsubscribe</span>
												              <p className={data.status == 'unread' ? 'black-text': 'white-text'}>{data.message}</p>
												            </li>
												            :false
												        }
												        </React.Fragment>
												      )
												    })
												  }
												  </ul>
												}
												</div>
								            </li>
								            : false
								          }
								        </ul>
					    	  		</div>
					    	  	</div>
					    	  </div>
					    	</nav>
					  	</div>
					  </React.Fragment>
					)
				}
			</ContextDATA.Consumer>

		)
	}
}
export default Navbar