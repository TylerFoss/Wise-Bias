import React from 'react';
import { Link } from 'react-router';
import { logout, refreshLogin } from '../actions/auth';
import { connect } from 'react-redux';
import Flash from '../components/Flash';
import Dashboard from "../components/Dashboard";


class NavBar extends React.Component {
  // componentDidMount() {
  //    $(".button-collapse").sideNav({ closeOnClick: true });
  //    this.props.dispatch(refreshLogin());
  //  }

  links = () => {
    return [

    ].map( (link, i) => {
      return this.link(i, link.name, link.path)
    })
  }

  link = (i, name, path) => {
    let activeClass = this.props.location.pathname === path ? '' : '';
    return (
      <li key={i} className={activeClass}>
        <Link to={path}>{name}</Link>
      </li>
    )
  }

  authLinks = () => {
    if (Object.keys(this.props.user).length) {
       let links = [
        ].map( (link, i) => {
          return this.link(i, link.name, link.path)
        });
        links.push(
          <li key="logout">
            <a
              href="#"
              onClick={ e => {
                this.props.dispatch(logout(this.props.router))
              }}
            >
              Logout
            </a>
          </li>
        )
      return links;
    } else {
      return [
        { name: 'Profile', path: '/Account' },
      ].map( (link, i) => {
        let active = this.props.location.pathname === link.path ? 'active' : '';
        return this.link(i, link.name, link.path)
      })
    }
  }

  render() {
    console.log(this.props.router)
    return (
      <div>
      <nav className="white z-depth-0 container">
          <div>
            <a href="/" className="brand-logo">WiseBias</a>
            {/* <a href="#" data-activates="mobile" className="button-collapse"><i className="material-icons">menu</i></a> */}
            <ul className="right">
              { this.links() }
              { this.authLinks() }
            </ul>
            {/* <ul className="side-nav" id="mobile">
              { this.links() }
              { this.authLinks() }
            </ul> */}
          </div>
        </nav>
        <Flash />
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}


export default connect(mapStateToProps)(NavBar);
