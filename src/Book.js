import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    onHandleShelf: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      shelf: "none"
    }
  }
  onChangeShelf = (value) => {
    this.props.onHandleShelf(this.props.book, value)
    this.setState({shelf: value})
    }
  
  componentDidMount() {
    this.setState({shelf: this.props.shelf})
  }
  render() {
    const { title, thumbnail, authors } = this.props
    return (
      <div>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})`}}></div>
            <div className="book-shelf-changer">
              <select value={this.state.shelf} onChange={(e) => this.onChangeShelf(e.target.value)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{authors ? authors.join(', '): ''}</div>
        </div>
      </div>
    );
  }
};
export default Book