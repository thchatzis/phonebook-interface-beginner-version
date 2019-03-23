import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'

class Contacts  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.sortFromAtoZ = this.sortFromAtoZ.bind(this);
    this.sortFromZtoA = this.sortFromZtoA.bind(this);
  }

  static defaultProps = {
    contacts: []
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.contacts !== nextProps.contacts) {
      const filteredContacts = this.filterContacts(nextProps.contacts, "");
      this.setState({
        filtered: filteredContacts
      });   
    }
  }

  filterContacts(contacts, keyword) {
    if (keyword !== "") {
      return contacts.filter(contact => {
        return contact.name.toLowerCase().includes(keyword.toLowerCase());;
      });
    } else {
      return contacts;
    }
  }

  handleChange(e) {
    const filteredContacts = this.filterContacts(this.props.contacts, e.target.value);
    this.setState({
      filtered: filteredContacts
    });
  }
  
  sortFromAtoZ() {
    const sorted = this.state.filtered.sort(function(a, b){
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
    })
    this.setState({
      filtered: sorted
    });
  }

  sortFromZtoA() {
    const sorted = this.state.filtered.sort(function(a, b){
      if(b.name < a.name) { return -1; }
      if(b.name > a.name) { return 1; }
      return 0;
      })
    this.setState({
      filtered: sorted
    });
  }

  render() {
    return (
      <div>
        <input type="text" className="input" onChange={this.handleChange} placeholder="Search..." />
        <h3>Sort by</h3>
        <div className="buttons">
          <button onClick={this.sortFromAtoZ}>A to Z</button>
          <button onClick={this.sortFromZtoA}>Z to A</button>
        </div>
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Address</th>
            </tr>
          </thead>
          {this.state.filtered.map(contact => {
            return (
              <tbody key={contact.phone_number}>
                <tr>
                  <td>{contact.name}</td>
                  <td>{contact.phone_number}</td>
                  <td>{contact.address}</td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </div>
    );
  }
}

export default Contacts;
