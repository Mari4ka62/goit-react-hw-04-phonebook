import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  const findContacts = e => {
    setFilter(e.currentTarget.value);
  };
  const addContacts = (name, number) => {
    const contact = {
      name,
      number,
      id: nanoid(3),
    };
    const duplicatedContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (duplicatedContact) {
      return alert(`${duplicatedContact.name} is already in contacts`);
    }
    setContacts(state => [...state, contact]);
  };
  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };
  const addActualContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  return (
    <div className="container">
      <h2 className="title">Phonebook</h2>
      <ContactForm onSubmit={addContacts} />
      <Filter filterData={filter} onChange={findContacts} />
      <h2 className="title">Contacts</h2>
      <ContactList
        contacts={addActualContacts()}
        deleteContact={deleteContact}
      />
    </div>
  );
}
