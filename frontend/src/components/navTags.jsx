import React, { Component } from "react";
import { getTags } from "./services/categoryService";
import { Link } from "react-router-dom";

class NavTags extends Component {
  state = {
    tags: [],
  };

  componentDidMount = async () => {
    const { data: tags } = await getTags();
    this.setState({ tags });
  };

  render() {
    const { tags } = this.state;

    return (
      <div className="nav-tag-wrapper">
        <ul className="nav-tag">
          {tags.map((tag) => (
            <Link key={tag.id} className="link" to={`/${tag.name}`}>
              <li className="nav-tag-item">{tag.name}</li>
            </Link>
          ))}
        </ul>
        <hr></hr>
      </div>
    );
  }
}

export default NavTags;
