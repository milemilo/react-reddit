import React from "react";
import styled from "styled-components";
import axios from "axios";
import moment from 'moment';
import queryString from 'query-string';

const baseUrl = "http://www.reddit.com";

const styles = {
  "& .page-title": {
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
  "& .fa-comments": {
    marginRight: 5
  },
  "& .author-container": {
    marginBottom: 10
  },
  "& .comments-container": {
    marginBottom: 15
  }
};

const StyledDiv = styled.div`${styles}`;

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  componentDidMount() {
    const qs = queryString.parse(this.props.location.search);
    const url = `${baseUrl}/r/${qs.searchTerm}.json`;
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
  calculatePostTime(createdAt) {
    const time = createdAt !== null && moment.unix(createdAt)
    console.log(time)
    const timePosted = createdAt !== null && time.fromNow()
    console.log(timePosted)
    return timePosted
  }
  render() {
    const { posts } = this.state;
    const prefix = posts.length > 0 && posts[0].data.subreddit_name_prefixed;
    return (
      <StyledDiv>
        <h1 className="page-title">{prefix}</h1>
        <div className="row center-xs">
          {posts.slice(0, 25).map((post, i) => (
            <div
              className="col-xs-10 col-sm-12 col-md-6 col-lg-6 post start-xs"
              key={post.data.id}
            >
              <div className="img-container">
                {post.data.thumbnail.length > 0 &&
                post.data.thumbnail !== "self" ? (
                  <img className="image" src={post.data.thumbnail} />
                ) : (
                  <img
                    width="143"
                    className="image"
                    src="/src/assets/images/reddit_default.png"
                  />
                )}
              </div>
              <div className="details">
                <h3 className="title">
                  <a href={`${baseUrl}${post.data.permalink}`}>
                    {post.data.title}
                  </a>
                </h3>
                <div className="author-container">
                  <span className="author">Posted by {post.data.author}</span>
                  <span className="time">{this.calculatePostTime(post.data.created)}</span>
                </div>
                <div className="comments-container">
                  <i className="fas fa-comments" />
                  <a href={`${baseUrl}${post.data.permalink}`}>
                    {post.data.num_comments} comments
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </StyledDiv>
    );
  }
}

export default Posts;
