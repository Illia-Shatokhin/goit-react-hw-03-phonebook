import css from './App.module.css';
import { Component } from 'react';
import { HeadText } from './head-text/HeadText';
import { ContactsList } from './contacts-list/ContactsList';
import { PhonebookForm } from './phonebook-form/PhonebookForm';
import { LabelInput } from './label-input/LabelInput';
import { NoContactsMessage } from './noContactsMessage/noContactsMessage';

// { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
// { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
// { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
// { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contactsFromLocalStorage = localStorage.getItem('contacts');
    const contactsParse = JSON.parse(contactsFromLocalStorage) ?? [];
    this.setState({ contacts: contactsParse, filter: '' });
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  filterContacts() {
    return this.state.contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .startsWith(this.state.filter.toLowerCase());
    });
  }

  handleInputChangeFilter = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.filterContacts();
  };

  setAppState = obj => {
    this.setState(obj);
  };

  deleteContactById(id, contacts, setAppState) {
    const filteredArr = contacts.filter(contact => {
      return contact.id !== id;
    });
    setAppState({ contacts: filteredArr, filter: '' });
  }

  render() {
    return (
      <div className={css.container}>
        <HeadText title="Phonebook" />
        <PhonebookForm
          contacts={this.state.contacts}
          setAppState={this.setAppState}
        />
        <HeadText title="Contacts" />
        <LabelInput
          value={this.state.filter}
          handleInputChange={this.handleInputChangeFilter}
          type="text"
          name="filter"
          labelName="Find contacts by name"
        />
        {this.filterContacts().length ? (
          <ContactsList
            contacts={this.filterContacts()}
            setAppState={this.setAppState}
            deleteContactById={this.deleteContactById}
          />
        ) : (
          <NoContactsMessage name={this.state.filter} />
        )}
      </div>
    );
  }
}
