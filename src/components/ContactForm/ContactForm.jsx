import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';
export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  recordContact = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  submitContact = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };
  reset = () => {
    this.setState({ name: '', number: '' });
  };
  render() {
    return (
      <form onSubmit={this.submitContact} className={css.form}>
        <label className={css.label}>Name</label>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={this.state.name}
          onChange={this.recordContact}
          className={css.inputForm}
        />
        <label className={css.label}>Number</label>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={this.state.number}
          onChange={this.recordContact}
          className={css.inputForm}
        />
        <button type="submit" className={css.addButton}>
          Add contact
        </button>
      </form>
    );
  }
}
ContactForm.propTypes = {
  onSubmit: PropTypes.func,
  value: PropTypes.number,
  onChange: PropTypes.func,
};
