import PropTypes from 'prop-types';

const ButtonPrimaryOnclick = ({
  title, iconL, iconR, hidden, responsiveAppear, onClick, disable,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex space-x-1 items-center justify-center py-1 p-2 text-primary rounded-md w-full focus:outline-none transition duration-300
    ${hidden} ${responsiveAppear}:flex 
    ${disable ? 'cursor-not-allowed ' : ' '}
    ${disable ? '' : ''}`}
    disabled={disable}
  >
    <div>{iconL}</div>
    <div className="whitespace-nowrap">{title}</div>
    <div>{iconR}</div>
  </button>
);

ButtonPrimaryOnclick.propTypes = {
  title: PropTypes.string.isRequired,
  iconL: PropTypes.node,
  iconR: PropTypes.node,
  hidden: PropTypes.string,
  responsiveAppear: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disable: PropTypes.bool,
};

ButtonPrimaryOnclick.defaultProps = {
  iconL: '',
  iconR: '',
  hidden: '',
  responsiveAppear: 'md',
  disable: false,
};

export default ButtonPrimaryOnclick;
