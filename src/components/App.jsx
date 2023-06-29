import css from './App.module.css';
import { Component } from 'react';
import { HeadText } from './head-text/HeadText';
import { ContactsList } from './contacts-list/ContactsList';
import { PhonebookForm } from './phonebook-form/PhonebookForm';
import { LabelInput } from './label-input/LabelInput';
import { NoContactsMessage } from './noContactsMessage/noContactsMessage';
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from './../services/localStorage';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contactsFromLocalStorage = loadFromLocalStorage('contacts');
    this.setState({ contacts: contactsFromLocalStorage, filter: '' });
  }

  componentDidUpdate() {
    saveToLocalStorage('contacts', this.state.contacts);
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
