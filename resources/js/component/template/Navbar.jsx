import React from 'react';
import {
  Link,
} from "react-router-dom";
import ContextDATA from '../../ContextDATA';

class Navbar extends React.Component{
	static contextType = ContextDATA
	constructor(props){
		super(props)
		this.state = {
			search: 'hide',
			navmobile: 'hide-on-med-and-down',
			showonsmall: 'show-on-small',
			inputsearch: ''
		}
		this.openNotification = this.openNotification.bind(this)
		this.search = this.search.bind(this)
		this.openSearch = this.openSearch.bind(this)
		this.closeSearch = this.closeSearch.bind(this)
		this.handle = this.handle.bind(this)
	}
	openNotification(e){
		$('#slide-in').sidenav('open');
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
	componentDidMount(){}
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
						          <input autoComplete="off" id="search" type="search" onKeyUp={this.handle}/>
						          <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
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
									              <a data-target="slide-in" onClick={this.openNotification} className={result.ui.navbar.bg ? "btn-floating pulse darken-3 pointer " + result.ui.navbar.bg: "btn-floating pulse lighten-1 pointer"}>
									              	<i className="material-icons left">notifications_none</i>
									              </a>
									              <a href="/search" className={result.ui.navbar.bg ? "btn-floating pulse darken-3 z-depth-0 pointer " + result.ui.navbar.bg: "btn-floating pulse blue darken-2 z-depth-0 pointer"} onClick={this.openSearch}>
									              	<i className="material-icons left">search</i>
									              </a>
								            	</li>
								            	: 
								            	<li className="right">
								            		<a href="/search" className={result.ui.navbar.bg ? "btn-floating pulse darken-3 z-depth-0 pointer " + result.ui.navbar.bg: "btn-floating pulse blue darken-2 z-depth-0 pointer"} onClick={this.openSearch}>
									              		<i className="material-icons left">search</i>
									              	</a>
								          			<Link className="btn-small blue darken-2 z-depth-0" to="/login"><i className="material-icons">login</i></Link>
								          		</li>
								          	}
								        </ul>
								        <ul id="nav-mobile" className={"right " + this.state.navmobile}>
								          <li><Link to="/popular">Popular<i className="material-icons left">view_quilt</i></Link></li>
								          <li><Link to="/latest">Latest<i className="material-icons left">sort_by_alpha</i></Link></li>
								          
								          {
								            result.users.id ?
								            <li>
								              	<a data-target="slide-in" onClick={this.openNotification} className={result.ui.navbar.bg ? "btn-floating pulse darken-3 pointer " + result.ui.navbar.bg: "btn-floating pulse lighten-1 pointer"}>
								              		<i className="material-icons left">notifications_none</i>
								              	</a>
								            </li>
								            : false
								          }
								          <li><a href="/search" className={result.ui.navbar.bg ? "btn-floating pulse darken-3 z-depth-0 pointer " + result.ui.navbar.bg: "btn-floating pulse blue darken-2 z-depth-0 pointer"} onClick={this.openSearch}>
									        <i className="material-icons left">search</i>
									      </a></li>
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