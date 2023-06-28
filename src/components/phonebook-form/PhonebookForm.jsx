import { Component } from 'react';
import css from './PhonebookForm.module.css';
import { LabelInput } from 'components/label-input/LabelInput';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { Button } from 'components/button/Button';

export class PhonebookForm extends Component {
  static defaultProps = {
    contacts: [],
    setAppState: () => {},
  };
  state = {
    name: '',
    number: '',
  };

  addContact = e => {
    e.preventDefault();
    const newContact = [
      { name: this.state.name, number: this.state.number, id: nanoid() },
    ];
    if (this.props.contacts.some(contact => this.state.name === contact.name)) {
      alert(`${this.state.name} is already in contacts`);
    } else {
      const newArrOfContacts = [...this.props.contacts, ...newContact];
      this.props.setAppState({
        contacts: newArrOfContacts,
      });
    }
    this.setState({
      name: '',
      number: '',
    });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form className={css.form} onSubmit={this.addContact}>
        <LabelInput
          value={this.state.name}
          handleInputChange={this.handleInputChange}
          placeholder="Annie Copeland"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          labelName="Name"
        />
        <LabelInput
          value={this.state.number}
          handleInputChange={this.handleInputChange}
          placeholder="227-91-26"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          labelName="Number"
        />
        <Button type="sumbit" text="Add button" />
      </form>
    );
  }
}

PhonebookForm.propTypes = {
  contacts: PropTypes.array,
  setAppState: PropTypes.func,
};
