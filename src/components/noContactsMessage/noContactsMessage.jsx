import css from './noContactsMessage.module.css';
import PropTypes from 'prop-types';

export const NoContactsMessage = ({ name }) => {
  return <p className={css.message}>No contacts with name: {name}</p>;
};

NoContactsMessage.propTypes = {
  name: PropTypes.string,
};
