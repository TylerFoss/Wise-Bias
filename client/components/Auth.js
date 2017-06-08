import React from 'react';
import { connect } from 'react-redux';
import { refreshLogin } from '../actions/auth';
import { setFlash } from '../actions/flash';

class Auth extends React.Component {
  state = { affiliation: null };

  handleChange = (e) => {
  this.setState({ affiliation: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let { email, password, affiliation, props: { location, dispatch, router }} = this;
    let extraData = location.pathname === "/signup" ? {affiliation: this.state.affiliation} : {}

    $.ajax({
      url: `/api/auth${location.pathname}`,
      type: 'POST',
      data: { email: email.value, password: password.value, ...extraData }
    }).done( user => {
      dispatch(refreshLogin(user));
      router.push("/dashboard")
    }).fail( err => {
      debugger
      dispatch(setFlash(err, 'error'))
    });
  }

  render() {
    return (
      <div className="container auth-page">
        <div className="center">
          <a href="/"><img className="responsive-img logo_img" src="../images/Wisebias_logo.png" alt="WiseBias Logo"/></a>
        </div>
        <h2 className="center">{this.props.route.title}</h2>
        <div className="row">
          <form className="auth-form" onSubmit={this.handleSubmit}>
            <input type="email" required={true} ref={ n => this.email = n } placeholder="email" />
            <input type="password" required={true} ref={n => this.password = n } placeholder="password" />
            {this.props.location.pathname === "/signin" ? null :
            <div>
              <ul className="interest-list">
                <div className="center section-title">
                  <h3 className="center">Your Interests</h3>
                  <h6>Which topics would you like to explore other views?</h6>
                </div>
                <li id="selected-topic">Politics</li>
                <li>Religion</li>
                <li>Sports</li>
              </ul>
              <div className="affiliation-list">
                <div className="center section-title">
                  <h3 className="center">Where You Stand</h3>
                </div>
                <select className="browser-default" onChange={this.handleChange}>
                  <option value="1">Liberal</option>
                  <option value="2">Moderate - Liberal</option>
                  <option value="3">Moderate - Conservative</option>
                  <option value="4">Conservative</option>
                </select>
              </div>
            </div>
          }
          <button className="btn col m12">{this.props.route.title}</button>
          {this.props.location.pathname === "/signin" ? <a className="no-auth-login-btn center login-btn" href="/signup">Register</a> :
          <a className="login-btn no-auth-login-btn center" href="/signin">Have An Account?</a>
        }

        </form>
      </div>
    </div>
  )
}
}

export default connect()(Auth);
