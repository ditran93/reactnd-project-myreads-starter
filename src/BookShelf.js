import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

const BookShelf = function(props) {
        return (
            <div className="bookshelf">
            <h2 className="bookshelf-title">{props.bookShelfTitle}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {props.books.map(book => ((book.shelf === `${props.shelf}`) && (
                    <li key={book.id}>
                    <Book 
                        book={book}
                        shelf={book.shelf}
                        onHandleShelf={props.onHandleShelf}
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
    BookShelf.propTypes = {
        books: PropTypes.array.isRequired
    }

export default BookShelf