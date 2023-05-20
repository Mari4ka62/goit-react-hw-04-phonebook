import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
    isAdd: false,
    isDelete: false,
  };
  componentDidMount() {
    const localData = localStorage.getItem('contact');
    if (localData) {
      this.setState({ contacts: JSON.parse(localData) });
    }
  }
  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contact', JSON.stringify(this.state.contacts));
    }
    if (prevState.contacts.length < this.state.contacts.length) {
      this.setState({ isAdd: true });
      setTimeout(() => {
        this.setState({ isAdd: false });
      }, 1500);
    }
    if (prevState.contacts.length > this.state.contacts.length) {
      this.setState({ isDelete: true });
      setTimeout(() => {
        this.setState({ isDelete: false });
      }, 1500);
    }
  }
  findContacts = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  addContacts = ({ name, number }) => {
    const contact = {
      name,
      number,
      id: nanoid(3),
    };
    const duplicatedContact = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (duplicatedContact) {
      return alert(`${duplicatedContact.name} is already in contacts`);
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  render() {
    const actualContact = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return (
      <div className="container">
        <h2 className="title">Phonebook</h2>
        <ContactForm onSubmit={this.addContacts} />
        {this.state.isAdd && <div role="alert">Add number successfully!</div>}
        {this.state.isDelete && (
          <div role="alert">Deleted number successfully!</div>
        )}

        <Filter filterData={this.state.filter} onChange={this.findContacts} />
        <h2 className="title">Contacts</h2>
        <ContactList
          contacts={actualContact}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
