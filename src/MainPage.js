import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

class MainPage extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onHandleShelf: PropTypes.func.isRequired
  }
  render() {
    const { books, onHandleShelf } = this.props
    return (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf 
                bookShelfTitle="Currently Reading" 
                books={books} 
                shelf="currentlyReading" 
                onHandleShelf={onHandleShelf}/>
                <BookShelf 
                bookShelfTitle="Want to Read" 
                books={books} 
                shelf="wantToRead"
                onHandleShelf={onHandleShelf}/>
                <BookShelf 
                bookShelfTitle="Read" 
                books={books} 
                shelf="read"
                onHandleShelf={onHandleShelf}/>
              </div>
            </div>
            <Link 
            to="/search"
            className="open-search"
            >Add a book</Link>
          </div>
    )
  }
}

export default MainPage
