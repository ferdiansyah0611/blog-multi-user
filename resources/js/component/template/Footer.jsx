import React from 'react'
import ReactDOM from 'react-dom'
import {
  Link,
} from "react-router-dom";
/*context*/
import ContextDATA from '../../ContextDATA';

class FooterCMP extends React.Component {
  render() {
    return(
      <ContextDATA.Consumer>
        {
          result => (
            result.ui.footer.status ? 
              <footer className={"page-footer darken-3 " + result.ui.footer.bg}>
                <div className="container">
                  <div className="row">
                    <div className="col l6 s12">
                      <h5 className="white-text">Go Blog by ferdiansyah0611</h5>
                      <p className="grey-text text-lighten-4">Go Blog is a multi-user blog publishing service with many features. It is free as for the paid version.</p>
                    </div>
                    <div className="col l4 offset-l2 s12">
                      <h5 className="white-text">More</h5>
                      <ul>
                        <li><Link className="grey-text text-lighten-3" to="/contact-us">Contact US</Link></li>
                        <li><Link className="grey-text text-lighten-3" to="/premium">Subscribe Premium</Link></li>
                        <li><a className="grey-text text-lighten-3" href="#!">About</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="footer-copyright">
                  <div className="container">
                  © 2020 Copyright
                  <a className="grey-text text-lighten-4 right" href="#!">Privacy & Policy</a>
                  </div>
                </div>
              </footer>
            : ''
          )
        }
      </ContextDATA.Consumer>
    )
  }
}
export default FooterCMP;