import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EditTopicPage extends Component {
  state = {
    formData: this.props.location.state.topic
  };

  handleChange = e => {
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.value
      }
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleUpdateTopic(this.state.formData);
  }

  render() {
    return (
      <>
        <h1>Edit Learning Topic</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Name/Brief Description of Topic: </label>
            <input
              name='name'
              value={this.state.formData.name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label>Learning Resource for this Topic (url): </label>
            <input
              name='resource'
              value={this.state.formData.resource}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Topic Category: </label>
            <select name="category" value={this.state.formData.category} onChange={this.handleChange}>
              <option>Choose a Category</option>
              {this.props.categories.categoryName.map((category, idx) => <option key={category.id} value={category.categoryName}>{category}</option>)}
            </select>
          </div>
          <div>
            <label>Have you already learned this? </label>
            <select name="learned" value={this.state.formData.learned} onChange={this.handleChange}>
              <option value="false">No</option>
              <option value="true">Yes!</option>
            </select>
          </div>
          <button type="submit" className="button">
            SUBMIT CHANGES
          </button>&nbsp;&nbsp;
          <Link to='/'>CANCEL</Link>
        </form>
      </>
    );
  }
}

export default EditTopicPage;