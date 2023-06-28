import css from './HeadText.module.css';
import PropTypes from 'prop-types';

export const HeadText = ({ title }) => {
  return (
    <>
      <p className={css.headText}>{title}</p>
    </>
  );
};

HeadText.propTypes = {
  title: PropTypes.string,
};
