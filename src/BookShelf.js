import React, { Component } from 'react'
import Book from './Book'
class BookShelf extends Component {
    
    render() {
        return (
            <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.bookShelfTitle}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {this.props.books.map(book => ((book.shelf === `${this.props.shelf}`) && (
                    <li key={book.id}>
                    <Book 
                        book={book}
                        shelf={book.shelf}
                        onHandleShelf={this.props.onHandleShelf}
                        title={book.title}
                        authors={book.authors} 
                        thumbnail={book.imageLinks.smallThumbnail}/>
                        </li>
                )
              )
              )}
              </ol>
            </div>
          </div>
        )
    } 
    }
export default BookShelf