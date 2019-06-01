import React from 'react';
import axios from 'axios';

const url = 'https://www.reddit.com/r/pizza.json'

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }
  componentDidMount() {
    axios.get(url)
    .then(res => {
      console.log(res.data.data.children)
      this.setState({ posts: res.data.data.children })
    })
    .catch(err => {
      console.log(err)
    })
  }
  render() {
    return(
      <h1>Posts</h1>
    )
  }
}

export default Posts
