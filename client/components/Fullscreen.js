import React from 'react';
import Article from "../components/Article";

class Fullscreen extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="fullscreen-page">
        <div className="fullscreen-iframe">
          <iframe src={this.props.articleData.url} width="100%" height="800px"></iframe>
        </div>
      </div>
    );
  }
};

export default Fullscreen;
