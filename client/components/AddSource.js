import React from 'react';

class AddSource extends React.Component {


  addSource = (e) => {
    e.preventDefault();
    let title = this.title.value;
    let url = this.url.value;
    let categories = this.categories.value;
    let affiliation = this.affiliation.value;

    $.ajax({
      url: 'api/articles',
      type: 'POST',
      data: { title, url, categories, affiliation }
    }).done( article => {
      console.log("Done");
    }).fail( data => {
      console.log("fail")
    });
  }

  render() {

    return (
      <div className="source-form">
        <h3>Add An Article</h3>
        <form ref={ n => this.form = n } onSubmit={this.addSource}>
          <input ref={ n => this.title = n } placeholder="Article Title"/>
          <input ref={ n => this.url = n } placeholder="Url"/>
          <input type="text" ref={ n => this.categories = n } placeholder="categories"/>
          <input ref={ n => this.affiliation = n } placeholder="Affiliation"/>
          <button className="btn">Add Article</button>
        </form>
      </div>
    );
  }
};

export default AddSource;
