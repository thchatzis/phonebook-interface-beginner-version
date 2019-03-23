import React, { Component } from 'react';
import './App.css';
import Contacts from './Contacts';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contactsList: []
    }
  }
  
  componentDidMount() {
    const self = this;
    axios("http://www.mocky.io/v2/581335f71000004204abaf83")
        .then(function (response) {
            self.setState({
              contactsList: response.data.contacts
            });
        });
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Contacts</h1>
        </header>
        
        <Contacts contacts={this.state.contactsList} />
      </div>
    );
  }
}

export default App;
