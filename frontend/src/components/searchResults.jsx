import React, { Component } from "react";
import { Link } from "react-router-dom";

class SearchResults extends Component {
  state = {};
  render() {
    const { results } = this.props;
    return (
      <div className="search__results">
        {!!results.length ? (
          <ul>
            {results.map((result) => (
              <Link
                key={result.id}
                className="link link--no_highlight"
                to={`/product/${result.id}`}
              >
                <li>
                  <img src={result.image} alt={result.title}></img>
                  <span>{result.title}</span>
                  <i className="fas fa-reply"></i>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <ul>
            <li>
              <img></img>
              <span>No search results found.</span>
            </li>
          </ul>
        )}
      </div>
    );
  }
}

export default SearchResults;
