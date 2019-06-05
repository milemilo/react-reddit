import React from 'react';
import axios from 'axios';

class PhotoViewer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      images: []
    }
  }
  componentDidMount() {
    axios.get('http://www.reddit.com/r/pizza.json')
      .then((res) => {
        this.aggData(res.data.data.children)
        return axios.get('http://www.reddit.com/r/sushi.json');
      })
      .then((res) => {
        this.aggData(res.data.data.children)
        return axios.get('http://www.reddit.com/r/food.json');
      })
      .then((res) => {
        this.aggData(res.data.data.children)
      })
      .catch((err) => {
        console.log(err)
      });
  }
  aggData(posts) {
    posts.map(post => {
      if(post.data.thumbnail !== "" && post.data.thumbnail !== "self") {
        this.setState({
          images: [...this.state.images, {
            src: post.data.url,
            title: post.data.title
          }]
        })
      }
    })
  }
  render() {
    console.log(this.state.images)
    return(
      <h1>Photo Viewer</h1>
    )
  }
}

export default PhotoViewer;
