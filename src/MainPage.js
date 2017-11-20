import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class MainPage extends Component {
  
  render() {
    console.log(this.props.books)
    return (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf 
                bookShelfTitle="Currently Reading" 
                books={this.props.books} 
                shelf="currentlyReading" 
                onHandleShelf={this.props.onHandleShelf}/>
                <BookShelf 
                bookShelfTitle="Want to Read" 
                books={this.props.books} 
                shelf="wantToRead"
                onHandleShelf={this.props.onHandleShelf}/>
                <BookShelf 
                bookShelfTitle="Read" 
                books={this.props.books} 
                shelf="read"
                onHandleShelf={this.props.onHandleShelf}/>
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
