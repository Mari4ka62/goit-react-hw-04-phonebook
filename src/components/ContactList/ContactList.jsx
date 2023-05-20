import PropTypes from 'prop-types';
import css from './ContactList.module.css';
export default function ContactList({ contacts, deleteContact }) {
  return (
    <ul className={css.listContact}>
      {contacts.map(contact => (
        <li key={contact.id} className={css.listItem}>
          <p className={css.text}>
            {contact.name}: {contact.number}
          </p>
          <button
            type="button"
            onClick={() => deleteContact(contact.id)}
            className={css.buttonDelete}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
ContactList.propTypes = {
  contacts: PropTypes.array,
  deleteContact: PropTypes.func,
};
