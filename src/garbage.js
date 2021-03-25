import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';


export default function garbage() {
    return (
        <div>
            <Link to="/">
                <img src="images/birds.png" alt="header-icon"></img>
            </Link>
          <nav>
            <div className="dropdown">
              <Link to="#" >
                Birds {(<ArrowDropDownOutlinedIcon style={{ fontSize: 30}} />)}
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/">Bird Guide</Link>
                </li>
                <li>
                  <Link to="/">Bir Guide</Link>
                </li>
                <li>
                  <Link to="/">Bir Guide</Link>
                </li>
                <li>
                  <Link to="/">Bir Guide</Link>
                </li>
              </ul>
            </div>
            <div className="dropdown">
              <Link to="#" >
                Birds {(<ArrowDropDownOutlinedIcon style={{ fontSize: 30}} />)}
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/">Bir Guide</Link>
                </li>
                <li>
                  <Link to="/">Bir Guide</Link>
                </li>
                <li>
                  <Link to="/">Bir Guide</Link>
                </li>
                <li>
                  <Link to="/">Bir Guide</Link>
                </li>
              </ul>
            </div>
            <div className="dropdown">
              <Link to="#">
                Birds {(<ArrowDropDownOutlinedIcon style={{ fontSize: 30}} />)}
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/">Bir Guide</Link>
                </li>
                <li>
                  <Link to="/">Bir Guide</Link>
                </li>
                <li>
                  <Link to="/">Bir Guide</Link>
                </li>
                <li>
                  <Link to="/">Bir Guide</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
    )
}
