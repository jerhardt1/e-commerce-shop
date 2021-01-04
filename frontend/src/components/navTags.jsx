import React, { Component } from "react";
import { getTags } from "./services/categoryService";
import { Link } from "react-router-dom";

class NavTags extends Component {
  state = {
    tags: [],
    activeTag: null,
  };

  componentDidMount = async () => {
    const { data: tags } = await getTags();

    this.setState({ tags });
  };

  setActiveTag = (tag) => {
    this.setState({ activeTag: tag });
  };

  getClassName = (tag) => {
    let name = "nav-tag-item";

    name = tag === this.state.activeTag ? name + " font--important" : name;

    return name;
  };

  render() {
    const { tags } = this.state;

    return (
      <div className="nav-tag-wrapper">
        <ul className="nav-tag">
          {tags.map((tag) => (
            <Link
              key={tag.id}
              className="link"
              to={`/${tag.name}`}
              onClick={() => this.setActiveTag(tag)}
            >
              <li className={this.getClassName(tag)}>{tag.name}</li>
            </Link>
          ))}
        </ul>
        <hr></hr>
      </div>
    );
  }
}

export default NavTags;
