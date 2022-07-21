import { cloneElement, Suspense } from 'react';
import PropTypes from 'prop-types';
import withMainPage from '../../HOC/withMainPage';
import { IconSpiner } from '../../../assets/icons/icons';

const ChildHome = ({ childComponent, ...props }) => (
  <>
    <Suspense
      fallback={(
        <div className="flex w-full h-full text-xl text-gray-800 min-h-screen font-semibold items-center justify-center">
          <IconSpiner medium primary />
          {' '}
          Cargando...
        </div>
      )}
    >
      {cloneElement(childComponent, { ...props })}
    </Suspense>
  </>
);

ChildHome.propTypes = {
  childComponent: PropTypes.node.isRequired,
};

export default withMainPage(ChildHome);
