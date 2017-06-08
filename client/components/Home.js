import React from 'react';

const Home = () => (
  <div className="center home_container">
    <div className="container">
      <div className="row">
        <img className="responsive-img logo_img" src="../images/Wisebias_logo.png" alt="WiseBias Logo"/>
        <h5 className="">A place to expand your <br/> point of view</h5>
        <br/>
        <a href="/signup"><button className="center home-btn">Get Started</button></a>
        <a className="login-btn" href="/signin">Have An Account?</a>
      </div>
    </div>
  </div>
)

export default Home;
