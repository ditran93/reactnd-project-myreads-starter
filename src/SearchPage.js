
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import { Debounce } from 'react-throttle'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class Search extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
        query:"",
        results: []
    };
  } 
  
    updateQuery = (query) => {
            this.setState({ query: query})
            if (query === '') {
              return;
            }
            BooksAPI.search(query, 10).then((data) => {
                data.map(response => {
                    const tempLib = this.props.books.find((b) => b.id === response.id)
                    if(tempLib) {
                      return response.shelf = tempLib.shelf
                    } else return response.shelf = "none"
                })
                this.setState(state => ({
                    results: data
                }))
                console.log("results", this.state.results)
            })
        }
    
    render() {
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search"></Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <Debounce time="400" handler="onChange">
                <input 
                type="string" 
                placeholder="Search by title or author"
                onChange={(e) => this.updateQuery(e.target.value)}
                />
                </Debounce>
              </div>
            </div>
            <div className="search-books-results">
            <ol className="books-grid">
                      {this.state.results.map(result => (
                        <li key={result.id}>
                        <Book
                          book={result}
                          shelf={result.shelf}
                          thumbnail={result.imageLinks.thumbnail}
                          onHandleShelf={this.props.onHandleShelf}
                          title={result.title}
                          authors={result.authors}
                        />
                        </li>
                      )
                    )
                    }
                    </ol>
            </div>
          </div>
        )
    }
}

export default Search