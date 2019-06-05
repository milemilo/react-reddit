import React from 'react';
import { Button, Input } from 'semantic-ui-react'
import styled from 'styled-components'
import axios from 'axios';

const styles = {
  '& .searchError': {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 15
  },
  '& .search-input': {
    marginRight: 10
  }
}

const StyledDiv = styled.div`${styles}`

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      searchError: false,
      submittedSearchValue: ""
    }
  }
  handleSearch() {
    const { searchValue } = this.state;
    axios
      .get(`https://www.reddit.com/r/${searchValue}.json`)
      .then(res => {
        this.props.history.push(`/posts?searchTerm=${searchValue}`)
      })
      .catch(err => {
        this.setState({
          searchError: true,
          submittedSearchValue: searchValue
        })
      });
  }
  handleOnChange(e) {
    this.setState({ searchValue: e.target.value })
  }
  render() {
    const { searchError, searchValue, submittedSearchValue } = this.state;
    return(
      <StyledDiv className="row middle-xs center-xs" style={{ height: 500 }}>
        <div className="col-xs">
          <h1>subReddit Search!</h1>
          <Input className="search-input" value={searchValue} onChange={e => this.handleOnChange(e)} label='/r/' placeholder='subreddit name...' />
          <Button
            disabled={searchValue.length === 0}
            className="search-button"
            onClick={() => this.handleSearch()}
            basic
            color='green'
          > Search!</Button>
          {searchError && <p className="searchError">{`We're sorry, r/${submittedSearchValue} doesn't exist. Please try again`}</p>}
        </div>
      </StyledDiv>
    )
  }
}

export default Home
