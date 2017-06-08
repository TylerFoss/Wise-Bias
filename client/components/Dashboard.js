import React from "react";
import ReactDom from "react-dom";
import Article from "../components/Article";
import AddSource from "../components/AddSource";
import {connect} from "react-redux";
import Fullscreen from "../components/Fullscreen";

class Dashboard extends React.Component {
  state = { articles: [] , id: '', affiliationData: [], activeArticle: {}, fullscreen: false }
  componentDidMount(){
    $.ajax({
      url: "/api/articles",
      type: "GET"
    }).done( articles => {
      this.setState({ articles },);
      this.filterArticles();
    });
    $('#modal1').modal();
  };

  componentDidUpdate(){
    $('#modal1').modal();
  }

  filterArticles = () => {
    const affiliation = this.props.user.affiliation

    switch(affiliation) {
      case 1:
      this.setState({affiliationData: this.state.articles.filter( a => a.affiliation === 2 ) })
      break;
      case 2:
      this.setState({affiliationData: this.state.articles.filter( a => a.affiliation === 3 && 5 ) })
      break;
      case 3:
      this.setState({affiliationData: this.state.articles.filter( a => a.affiliation === 2 && 5 ) })
      break;
      case 4:
      this.setState({affiliationData: this.state.articles.filter( a => a.affiliation === 3 ) })
      break;
    }
  }

  displayArticle = (e) => {
    e.preventDefault();
    let data = this.state.affiliationData;
    let num = Math.floor(Math.random() * data.length);
    let article = data[num]
    this.setState({activeArticle: article});
    this.myForm.reset()
  }

  openModal = () => {
    $('#modal1').modal('open')
  }

  fullscreenMode = (e) => {
    e.preventDefault();
    this.setState({ fullscreen: !this.state.fullscreen })
  }

  render(){
    let { activeArticle } = this.state;

    if (activeArticle && Object.keys(activeArticle).length) {
      if(this.state.fullscreen === false) {
      return(
        <div>
          <div className="row">
            <div id="main-article" className="col m7 offset-m1">
              <Article articleData={this.state.activeArticle} />
            </div>
            <div id="article-aside" className="col m3">
              <div id="reader-mode-div">
                <i className="reader-view-button fa fa-newspaper-o" onClick={this.fullscreenMode}><span>Reader View</span></i>
              </div>
              <h5>Did this video adjust your point of view on politics?</h5>
              <form ref={n => this.myForm = n}>
              <p>
                <input name="group1" type="radio" id="yes" />
                <label htmlFor="yes">Yes</label>
              </p>
              <p>
                <input name="group1" type="radio" id="marginally" />
                <label htmlFor="marginally">Marginally</label>
              </p>
              <p>
                <input name="group1" type="radio" id="no"  />
                <label htmlFor="no">No</label>
              </p>
              <button className="btn" onClick={this.displayArticle}>Next Article</button>
              </form>
            </div>
            <div className="col m1"></div>
          </div>
        </div>
      )
    } else if(this.state.fullscreen === true) {
      return(
        <div>
          <div>
            <div className="fullscreen-close">
              <i className="fa fa-times" onClick={this.fullscreenMode}></i>
            </div>
            <Fullscreen articleData={this.state.activeArticle}/>
            <div id="next-article-button">
              <button className=" btn" onClick={this.displayArticle}>Next Article</button>
            </div>
          </div>

        </div>
      )
    }
    }else {
      return(
        <div className="no-article-explore">
          <div className="container">
            <div className="valign-wrapper">
            <div className="valign">
              <h1>Get Started <br/>Exploring</h1>
              <br/>
              <button className="center-align btn" onClick={this.displayArticle}>Get Started</button>
            </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Dashboard);
