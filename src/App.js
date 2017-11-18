import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import Search from './SearchPage'

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books : []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
      // console.log(books)
    })
  }
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((data) => {
      this.setState(state => ({
          books: this.state.books.filter((b) => book.id !== b.id).concat([{...book,shelf}])
      }))
    })
  }
  addBook = (book) => {
    this.setState(state => ({
      books: this.state.books.concat(book)
    }))
  }
  render() {
    return (
      <div className="app">
      <Route exact path="/" render={() => (
        <ListBooks
        books={this.state.books}
        onUpdateBook={(book, shelf) => this.updateBook(book, shelf)}
        />
      )}/>
        <Route path="/search" render={() => (
          <Search
            books={this.state.books}
            onAddBook={(book, shelf) => {
              this.addBook(book)
            }}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
