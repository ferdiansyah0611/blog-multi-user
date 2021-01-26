import React from 'react';
import {
  Link,
} from "react-router-dom";
const BreadCrumb = (props) => {
  return(
    <nav className="light-blue darken-4 z-depth-0">
      <div className="nav-wrapper">
        <div className="col s12 ml-10px">
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
export default BreadCrumb;