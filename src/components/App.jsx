import css from './App.module.css';
import { Component } from 'react';
import { HeadText } from './head-text/HeadText';
import { ContactsList } from './contacts-list/ContactsList';
import { PhonebookForm } from './phonebook-form/PhonebookForm';
import { LabelInput } from './label-input/LabelInput';
import { NoContactsMessage } from './noContactsMessage/noContactsMessage';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  saveToLocalStorage = (key, value) => {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  };

  loadFromLocalStorage = key => {
    try {
      const serializedState = localStorage.getItem(key);
      return serializedState === null ? [] : JSON.parse(serializedState);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  };

  componentDidMount() {
    const contactsFromLocalStorage = this.loadFromLocalStorage('contacts');
    this.setState({ contacts: contactsFromLocalStorage, filter: '' });
  }

  componentDidUpdate() {
    this.saveToLocalStorage('contacts', this.state.contacts);
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
