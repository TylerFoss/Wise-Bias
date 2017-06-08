import React from 'react';
import { Link } from 'react-router';
import { logout, refreshLogin } from '../actions/auth';
import { connect } from 'react-redux';
import Flash from '../components/Flash';
import Dashboard from "../components/Dashboard";
import Footer from "../components/Footer"
import AddSource from "../components/AddSource"

class App extends React.Component {
  componentDidMount() {
    $(".button-collapse").sideNav({ closeOnClick: true });
    this.props.dispatch(refreshLogin());
    $('#modal1').modal();
  }

  componentDidUpdate(){
    $('#modal1').modal();
  }

  openModal = () => {
    $('#modal1').modal('open')
  }

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
        <div>
          <li key="upload">
            <a href="#"><i className="fa fa-plus" href="#modal1" onClick={this.openModal}></i></a>
          </li>
          <li key="dashboard">
            <a href="dashboard">Explore</a>
          </li>
          <li key="account">
            <a href="account">Account</a>
          </li>
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
        </div>
        )
      return links;
    } else {
      return [
        { name: 'Sign In', path: '/signin' },
        { name: 'Sign Up', path: '/signup' }
      ].map( (link, i) => {
        let active = this.props.location.pathname === link.path ? 'active' : '';
        return this.link(i, link.name, link.path)
      })
    }
  }

  render() {
    return (
      <div>
        <div className="z-depth-1">
          <nav className="white z-depth-0 container">
          <div>
            <a href="/" className="brand-logo">WiseBias</a>
            <a href="#" data-activates="mobile" className="button-collapse"><i className="material-icons">menu</i></a>
            <ul className="right">
              { this.links() }
              { this.authLinks() }
            </ul>
            <ul className="side-nav" id="mobile">
              { this.links() }
              { this.authLinks() }
            </ul>
          </div>
        </nav>
        </div>
        <Flash />
        {this.props.children}
        {/* Modal Structure */}
        <div id="modal1" className="modal">
          <div className="modal-header">
            <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat right">X</a>
          </div>
          <div className="modal-content">
            <AddSource />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(App);
