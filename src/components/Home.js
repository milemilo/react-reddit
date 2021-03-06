import React from "react";
import { Button, Input } from "semantic-ui-react";
import styled from "styled-components";
import axios from "axios";

const styles = {
  "& .orText": {
    marginTop: 25,
    marginBottom: 25
  },
  "& .searchError": {
    color: "red",
    fontWeight: "bold",
    marginTop: 15
  },
  "& .search-input": {
    marginRight: 10
  }
};

const StyledDiv = styled.div`
  ${styles}
`;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      searchError: false,
      submittedSearchValue: ""
    };
  }
  handleKeyPress = e => {
    if (this.state.searchValue.length && e.keyCode === 13) {
      this.handleSearch();
    }
  };
  handleSearch() {
    const { searchValue } = this.state;
    axios
      .get(`https://www.reddit.com/r/${searchValue}.json`)
      .then(res => {
        this.props.history.push(`/posts?searchTerm=${searchValue}`);
      })
      .catch(err => {
        this.setState({
          searchError: true,
          submittedSearchValue: searchValue
        });
      });
  }
  photosLink = () => {
    this.props.history.push("/photos");
  };
  handleOnChange(e) {
    this.setState({ searchValue: e.target.value });
  }
  render() {
    const { searchError, searchValue, submittedSearchValue } = this.state;
    return (
      <StyledDiv
        data-test="home-component"
        className="row middle-xs center-xs"
        style={{ height: 550 }}
      >
        <div className="col-xs">
          <h1>subReddit Search!</h1>
          <Input
            onKeyDown={this.handleKeyPress}
            className="search-input"
            value={searchValue}
            onChange={e => this.handleOnChange(e)}
            label="/r/"
            placeholder="subreddit name..."
          />
          <Button
            disabled={searchValue.length === 0}
            className="search-button"
            onClick={() => this.handleSearch()}
            basic
            color="blue"
          >
            Search!
          </Button>
          {searchError && (
            <p className="searchError">{`We're sorry, r/${submittedSearchValue} doesn't exist. Please try again`}</p>
          )}
          <div>
            <h5 className="orText">Or...</h5>
            <Button
              color="blue"
              content="Browse Photos"
              icon="picture"
              labelPosition="right"
              onClick={this.photosLink}
            />
          </div>
        </div>
      </StyledDiv>
    );
  }
}

export default Home;
