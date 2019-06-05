import React from "react";
import { Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import styled from "styled-components";
import axios from "axios";
import queryString from 'query-string';
import translate from 'translate'
import { calculatePostTime } from "../utils/helpers";

translate.engine = 'yandex'
// this should probably go somewhere else...
translate.key = 'trnsl.1.1.20190502T182808Z.e52ba92ecffb9eee.f9d03bb22ff9f9666857c6dcf49674d52979440a';
translate.from = 'en'

const baseUrl = "http://www.reddit.com";

const langOptions = [
  { key: 'us', value: 'English', flag: 'us', text: 'English' },
  { key: 'cn', value: 'Chinese', flag: 'cn', text: 'Chinese' },
  { key: 'jp', value: 'Japanese', flag: 'jp', text: 'Japanese' },
  { key: 'rs', value: 'Russian', flag: 'rs', text: 'Russian' },
]

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
  "& .nav-wrapper": {
    marginTop: 20,
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
    fontStyle: 'italic',
    marginLeft: 5
  },
};

const StyledDiv = styled.div`${styles}`;

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: "en",
      posts: [],
      titles: []
    };
  }
  handleSelect = (e, { value }) => {
    this.setState({ lang: value, titles: [] })
  }
  componentDidMount() {
    this.fetchPosts();
    this.fetchInterval = setInterval(() => {
      this.fetchPosts();
      console.log('fetching')
    }, 60000);
  }
  componentDidUpdate(prevProps, prevState) {
    const titles = []
    if (prevState.lang !== this.state.lang) {
      this.state.posts.map(post => {
        (async() => {
          try {
            const title = await translate(post.data.title, this.state.lang)
            translate('post.data.title', { from: 'en', to: this.state.lang });
            this.setState({ titles: [...this.state.titles, title] })
          } catch (err) {
            console.log(err);
          }
        })();
      })
    }
  }
  componentWillUnmount() {
    clearInterval(this.fetchInterval)
  }
  fetchPosts() {
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
  render() {
    const { lang, posts } = this.state;
    const prefix = posts.length > 0 && posts[0].data.subreddit_name_prefixed;
    return (
      <StyledDiv>
        <div className="row nav-wrapper">
          <div className="col-xs-12">
            <div className="row center-xs">
              <div className="col-xs-5 start-xs">
                <h3><Link to="/">Back to Home</Link></h3>
              </div>
              <div className="col-xs-5 end-xs">
                <Dropdown
                  placeholder='Select Language'
                  selection
                  options={langOptions}
                  onChange={this.handleSelect}
                />
              </div>
            </div>
          </div>
        </div>
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
                    {lang !== 'en' ? this.state.titles[i] : post.data.title}
                  </a>
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
          ))}
        </div>
      </StyledDiv>
    );
  }
}

export default Posts;
