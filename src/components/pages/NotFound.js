import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { scrollUp } from '../../utils/scrolling';
import imgError from '../../assets/img/404Error.svg';

const ButtonHome = ({
  tittle, href, onClick, id,
}) => (
  <a
    id={id}
    type="button"
    href={href}
    onClick={onClick}
    className={`text-white bg-primary whitespace-nowrap transition-colors duration-300 opacity-90 hover:opacity-100 text-sm py-2.5 px-4 rounded-full 
   cursor-pointer`}
  >
    {tittle}
  </a>
);
ButtonHome.propTypes = {
  tittle: PropTypes.string.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.string,
};
ButtonHome.defaultProps = {
  href: null,
  onClick: null,
  id: null,
};

const NotFound = () => {
  const location = useLocation();
  const { push } = useHistory();

  const goTo = (value) => {
    push(`/${value}`);
    scrollUp();
  };
  return (
    <div className="flex items-center justify-center mt-10">
      <div className="flex flex-col items-center justify-center my-5 w-3/4 sm:w-1/3 lg:w-1/4">
        <img alt="404" src={imgError} />
        <div className="flex justify-center mt-4 w-3/4">
          <ButtonHome
            tittle="Volver al Inicio"
            onClick={() => { goTo('home'); window.stop(); }}
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
