
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Debounce } from 'react-throttle'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
        query:"",
        results: []
    };
  } 
  
    updateQuery = (query) => {
            this.setState({ query: query})
            BooksAPI.search(query, 10).then((data) => {
                data.map(response => {
                    const tempLib = this.props.books.find((b) => b.id === response.id)
                    const shelf = tempLib ? tempLib.shelf : 'none'
                    return response.shelf = shelf
                })
                this.setState(state => ({
                    results: data
                    
                }))
                console.log("results", this.state.results)
            })
        }
    
    handleOnChange = (result, shelf) => {
        result.shelf = shelf
            this.props.onAddBook(result)
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
                {/* <Debounce time="100" handler="onChange"> */}
                <input 
                type="string" 
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={(event) => this.updateQuery(event.target.value)}
                />
                {/* </Debounce> */}
              </div>
            </div>
            <div className="search-books-results">
            <ol className="books-grid">
                      {this.state.results.map(result => (
                        <li key={result.id}>
                          <div className="book">
                            <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${result.imageLinks.thumbnail})`}}></div>
                              <div className="book-shelf-changer">
                                <select value={result.shelf} onChange={(e) => this.handleOnChange(result, e.target.value)}>
                                  <option value="none" disabled>Move to...</option>
                                  <option value="currentlyReading">Currently Reading</option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{result.title}</div>
                            <div className="book-authors">{result.authors}</div>
                          </div>
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