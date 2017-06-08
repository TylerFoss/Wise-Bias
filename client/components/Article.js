import React from "react";
import ReactDom from "react-dom";


class Article extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      completed: false,

    };
  }

  componentDidMount(){
    $('#share').modal();
  };

  componentDidUpdate(){
    $('#share').modal();
  }

  openModal = () => {
    $('#share').modal('open')
  }

  completed() {
    // this.setState({ completed: !this.state.completed });
  }

  render(){
    return(
        <div className="row">
          <div>
            <iframe src={this.props.articleData.url} width="100%" height="600px"></iframe>
          </div>
          <div className="article-info">
            <h2>{this.props.articleData.title}</h2>
            <h6>{this.props.articleData.categories}</h6>
            <div className="icons">
              <i className="fa fa-heart article-love"></i>
              <i className="fa fa-bookmark article-save"></i>
              <i className="fa fa-share-alt article-share" onClick={this.openModal} href="#share"></i>
              <a className="broken-link right" href="#">Report Broken Link</a>
            </div>
            <div className="right"></div>
          </div>

          {/* Modal Structure */}
          <div id="share" className="modal">
            <div className="share-modal modal-content">
              <h3>Share this Article</h3>
              <div className="share-logos">
                  <img src="../images/logos/fb-logo.png" alt="Facebook Logo"/>
                  <img src="../images/logos/twitter-logo.png" alt="Twitter Logo"/>
                  <img src="../images/logos/pinterest-logo.png" alt="Pinterest Logo"/>
              </div>

            </div>
          </div>

        </div>
    )
  }
}

  export default Article;
