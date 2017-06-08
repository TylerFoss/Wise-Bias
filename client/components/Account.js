import React from 'react';
import {connect} from "react-redux";


class Account extends React.Component {
  state = { affiliation: this.props.user.affiliation}

  changeAffiliation = (e) => {
    e.preventDefault();

    let { affiliation } = this.state;
    let { _id } = this.props.user;

    $.ajax({
      url: `/api/account/${_id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: {affiliation}
    }).done(user => {
      this.props.dispatch({ type: 'USER', user })
    })
  }

  handleFormChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col m5">
            <img className="responsive-img" src="../images/profileImage.jpg" alt=""/>
          </div>
          <div className="col m1"></div>
          <div className="col m6 affiliation-list">
            <form onSubmit={this.changeAffiliation}>
              <div className="center section-title">
                <h3 className="center">Profile Information</h3>
              </div>
              <h5>Username: <span>{this.props.user.username}</span></h5>
              <br/>
              <br/>
              <h5>Where You Stand</h5>
              <select onChange={this.handleFormChange} name="affiliation" value={this.state.affiliation} className="browser-default">
                <option value="1">Liberal</option>
                <option value="2">Moderate - Liberal</option>
                <option value="3">Moderate - Conservative</option>
                <option value="4">Conservative</option>
              </select>
              <br/>
              <button className="btn">Save</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Account);
