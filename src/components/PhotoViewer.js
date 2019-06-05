import React from 'react';
import Gallery from "react-photo-gallery";
import { arrayShuffle } from "../utils/helpers";
import styled from 'styled-components';
import axios from 'axios';

const styles = {
  "& .page-title": {
    marginBottom: 20,
    marginTop: 20
  }
}

const StyledDiv = styled.div`${styles}`;

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
        return axios.get('http://www.reddit.com/r/ramen.json');
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
            title: post.data.title,
            width: 1,
            height: 1
          }]
        })
      }
    })
  }
  render() {
    const { images } = this.state;
    // console.log(this.state.images)
    arrayShuffle(images)
    return(
      <StyledDiv>
        <div className="row center-xs">
          <div className="col-xs-12 page-title">
            <h1>Photo Viewer</h1>
          </div>
        </div>
        <Gallery photos={images} />
      </StyledDiv>
    )
  }
}

export default PhotoViewer;
