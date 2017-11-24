import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import MainPage from './MainPage'
import Search from './SearchPage'

class BooksApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
    books : []
    }
  }
  
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }
  changeBookShelf= (book, shelf) => {
    BooksAPI.update(book, shelf).then((data) => {
      this.setState(state => ({
          books: this.state.books.filter((b) => book.id !== b.id).concat([{...book,shelf}])
      }))
    })
  }

  render() {
    return (
      <div className="app">
      <Route exact path="/" render={() => (
        <MainPage
        books={this.state.books}
        onHandleShelf={this.changeBookShelf}
        />
      )}/>
        <Route path="/search" render={() => (
          <Search
            books={this.state.books}
            onHandleShelf={this.changeBookShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
