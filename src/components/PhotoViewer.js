import React from "react";
import Gallery from "react-photo-gallery";
import { Dropdown, Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { arrayShuffle } from "../utils/helpers";
import styled from "styled-components";
import axios from "axios";

const options = [
  { key: 1, text: "Pizza", value: "Pizza" },
  { key: 2, text: "Ramen", value: "ramen" },
  { key: 3, text: "Sushi", value: "sushi" },
  { key: 4, text: "Food", value: "food" }
];

const styles = {
  "& .nav-wrapper": {
    marginBottom: 75,
    marginTop: 20
  }
};

const StyledDiv = styled.div`
  ${styles}
`;

class PhotoViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      selectedFilter: ""
    };
  }
  componentDidMount() {
    axios
      .get("http://www.reddit.com/r/pizza.json")
      .then(res => {
        this.aggData(res.data.data.children);
        return axios.get("http://www.reddit.com/r/sushi.json");
      })
      .then(res => {
        this.aggData(res.data.data.children);
        return axios.get("http://www.reddit.com/r/ramen.json");
      })
      .then(res => {
        this.aggData(res.data.data.children);
        return axios.get("http://www.reddit.com/r/food.json");
      })
      .then(res => {
        this.aggData(res.data.data.children);
      })
      .catch(err => {
        console.log(err);
      });
  }
  aggData(posts) {
    posts.map(post => {
      if (post.data.url.includes('.jpg')) {
        this.setState({
          images: [
            ...this.state.images,
            {
              group: post.data.subreddit,
              src: post.data.url,
              title: post.data.title,
              width: 1,
              height: 1
            }
          ]
        });
      }
    });
  }
  handleSelect = (e, { value }) => this.setState({ selectedFilter: value });
  render() {
    const { images, selectedFilter } = this.state;
    const filteredImages = images.filter(img => img.group === selectedFilter);

    arrayShuffle(images);
    return (
      <StyledDiv data-test="photos-component">
        <div className="row nav-wrapper">
          <div className="col-xs-12">
            <div className="row center-xs">
              <div className="col-xs-5 start-xs">
                <h3>
                  <Link to="/">Back to Home</Link>
                </h3>
              </div>
              <div className="col-xs-5 end-xs">
                <Dropdown
                  clearable
                  placeholder="Filter by group...."
                  options={options}
                  selection
                  onChange={this.handleSelect}
                />
              </div>
            </div>
          </div>
        </div>
        <Gallery photos={selectedFilter.length ? filteredImages : images} />
      </StyledDiv>
    );
  }
}

export default PhotoViewer;
