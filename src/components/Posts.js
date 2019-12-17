import React from "react";
import styled from "styled-components";
import axios from "axios";

import { Dropdown } from "semantic-ui-react";
import Post from "./Post";

const baseUrl = "https://www.reddit.com";

const styles = {
  ".filter-dropdown": {
    marginBottom: "25px"
  },
  "& .page-title": {
    marginTop: "10px",
    textAlign: "center"
  },
  "& .post": {
    border: "1px solid lightGrey",
    borderRadius: 5,
    display: "flex",
    marginBottom: 15,
    maxWidth: 550,
    marginRight: 10,
    padding: 0
  },
  "& .details": {
    flexDirection: "column",
    paddingLeft: 10
  },
  "& .img-container": {
    alignItems: "center",
    display: "flex",
    justifyContent: "center"
  },
  "& .image": {
    borderRadius: 5
  },
  "& .nav-wrapper": {
    marginTop: 20
  },
  "& .fa-comments": {
    marginRight: 5
  },
  "& .author-container": {
    marginBottom: 10
  },
  "& .comments-container": {
    marginBottom: 15
  },
  "& .time": {
    fontStyle: "italic",
    marginLeft: 5
  }
};

const options = [{ key: 1, text: "Comments > 10", value: "greaterThan10" }];

const StyledDiv = styled.div`
  ${styles}
`;

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts() {
    const url = `${baseUrl}/r/pizza.json`;
    axios
      .get(url)
      .then(res => {
        this.setState({
          posts: res.data.data.children.filter(item => !item.data.distinguished)
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Do something with the selected filter value.
  handleFilterSelection = (e, { value }) => console.log(value);

  render() {
    const { posts } = this.state;
    const title = posts.length > 0 && posts[0].data.subreddit_name_prefixed;
    return (
      <StyledDiv data-test="posts-component">
        <h1 className="page-title">{title}</h1>
        <div className="row center-xs filter-dropdown">
          <Dropdown
            placeholder="Filter..."
            onChange={this.handleFilterSelection}
            clearable
            options={options}
            selection
          />
        </div>
        <div className="row center-xs">
          {posts.map((post, i) => (
            <Post post={post} key={post.data.id} />
          ))}
        </div>
      </StyledDiv>
    );
  }
}

export default Posts;
