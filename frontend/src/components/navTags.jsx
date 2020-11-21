import React, { Component } from "react";
import { getTags } from "./services/categoryService";

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
            <li className="nav-tag-item" key={tag.id}>
              {tag.name}
            </li>
          ))}
        </ul>
        <hr></hr>
      </div>
    );
  }
}

export default NavTags;
