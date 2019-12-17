import React from "react";
import { calculatePostTime } from "../utils/helpers";

const baseUrl = "http://www.reddit.com";

const Post = props => {
  const { post } = props;
  return (
    <div className="col-xs-10 col-sm-12 col-md-6 col-lg-6 post start-xs">
      <div className="img-container">
        {post.data.thumbnail.length > 0 && post.data.thumbnail !== "self" ? (
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
          <a href={`${baseUrl}${post.data.permalink}`}>{post.data.title}</a>
        </h3>
        <div className="author-container">
          <span className="author">Posted by {post.data.author}</span>
          <span className="time">{calculatePostTime(post.data.created)}</span>
        </div>
        <div className="comments-container">
          <i className="fas fa-comments" />
          <a href={`${baseUrl}${post.data.permalink}`}>
            {post.data.num_comments} comments
          </a>
        </div>
      </div>
    </div>
  );
};

export default Post;
