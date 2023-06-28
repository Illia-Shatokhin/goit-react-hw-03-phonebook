import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ type, text, id, onClick }) => (
  <button className={css.addButton} type={type} onClick={onClick} id={id}>
    {text}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
};
