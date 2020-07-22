import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AddTopicPage extends Component {
  state = {
    formData: {
      name: '',
      category: '',
      learned: 'false',
      resources: ''
    }
  }

  handleChange = e => {
    const changedFormData = {
      ...this.state.formData,
      [e.target.name]: e.target.value
    }
    this.setState({
      formData: changedFormData
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleAddTopic(this.state.formData);
  }

  render() {
    return (
      <>
        <h1>Add New Learning Topic</h1>
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
          <div>
            <label>Learning Resource for this Topic (url, optional): </label>
            <input
              name='resource'
              value={this.state.formData.resource}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="button">
            ADD TOPIC
          </button>&nbsp;&nbsp;
          <Link to='/'>CANCEL</Link>
        </form>
      </>
    );
  }
}

export default AddTopicPage;