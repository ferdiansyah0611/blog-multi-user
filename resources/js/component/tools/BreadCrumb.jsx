import React from 'react';
import {
  Link,
} from "react-router-dom";
/*context*/
import ContextDATA from '../../ContextDATA';

const BreadCrumb = (props) => {
  return(
    <ContextDATA.Consumer>
      {
        result => (
          <nav className={"darken-4 z-depth-0 " + result.ui.navbar.bg}>
            <div className="nav-wrapper">
              <div className="col s12 ml-10px">
                <Link to="/" className="breadcrumb">/</Link>
                {
                  props.data.map((data, key) => {
                    return(<Link to={data.url} className="breadcrumb" key={key}>{data.str}</Link>)
                  })
                }
              </div>
            </div>
          </nav>

        )
      }
    </ContextDATA.Consumer>
  )
}
export default BreadCrumb;