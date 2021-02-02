import React from 'react';
import {
  Link,
} from "react-router-dom";
import ContextDATA from '../../ContextDATA';

const Navbar = props => {
	$('.dropdown-trigger').dropdown();
	return(
		<ContextDATA.Consumer>
			{
				result => (
					<React.Fragment>
						<div className="navbar-fixed">
				    	<nav className={result.ui.navbar.bg}>
				    	  <div className="nav-wrapper">
				    	  	<div className="row">
				    	  		<div className="col s12">
							        <ul className="show-on-small">
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
								              <Link to="/search" className="btn-floating blue darken-2 z-depth-0 pointer">
								              	<i className="material-icons left">search</i>
								              </Link>
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
							        <ul id="nav-mobile" className="right hide-on-med-and-down">
							          <li><Link to="/search">Search<i className="material-icons left t-0">search</i></Link></li>
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
export default Navbar