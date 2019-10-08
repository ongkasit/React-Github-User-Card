import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import './App.css';

import UserCard from './Components/UserCard';
import FriendsList from './Components/FriendsList';

const Container = styled.div `
  display: flex;
  max-width: 50%;
  justify-content: space-between;
  margin: auto;
`

class App extends Component {
  constructor() {
  super()

  this.state = {
    username: 'ongkasit',
    gitUser: {},
    followers: [],
    inputValue: ''
  }
}

getUser = () => {
  axios.get(`https://api.github.com/users/${this.state.username}`)
  .then((response) => {
    this.setState({
      gitUser: response.data
    })
  })
  .catch((error) => {
    console.log(error)
  })

  axios.get(`https://api.github.com/user/${this.state.username}/followers`)
  .then((response) => {
    this.setState({
      followers: response.data
    })
  })
}

componentDidMount() {
  this.getUser();
}

componentDidUpdate(prevProps, prevState) {
  if(prevState.username !== this.state.username) {
    this.getUser();
  } else {
    return
  }
}
  
  render() {
    return(
      <Container>
        <UserCard {...this.state.gitUser} />
        <FriendsList follower={this.state.followers} /> 
      </Container>
    )
  }
}

export default App;
