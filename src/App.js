import { lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Redirect, Route, Switch, useHistory, useLocation,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { IconSpiner } from './assets/icons/icons';
import { Provider } from './components/context/context';
import ServiceWorkerWrapper from './serviceWorkerWrapper';
import { appVersion } from './config';

const AsyncNotFound = lazy(() => import('./components/pages/NotFound'));
const AsyncLogin = lazy(() => import('./components/pages/Login'));
const AsyncPDF = lazy(() => import('./components/pages/PDF/pdfByHtml'));
const AsyncHome = lazy(() => import('./components/pages/Home/Index'));

const LazyRoute = ({ children, path, isExact }) => (
  <Route exact={isExact} path={path}>
    <Suspense fallback={(
      <div className="flex w-full h-full fixed min-h-screen text-xl sm:text-3xl text-gray-800  font-semibold items-center justify-center">
        <IconSpiner medium dark />
        {' '}
        Cargando...
      </div>
    )}
    >
      {children}
    </Suspense>
  </Route>
);

LazyRoute.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
  isExact: PropTypes.bool,
};

LazyRoute.defaultProps = {
  isExact: true,
};

const refresh = 5 * 60 * 1000; // 5 min

const App = () => {
  console.log(`v${appVersion}`);
  const { push } = useHistory();
  const location = useLocation();

  return (

    <Provider>
      {/* <SWRConfig
        value={{
          fetcher,
          revalidateOnReconnect: true,
          refreshInterval: refresh, // 5 min
          onError: (error) => { // SLINT TELL ME REMOVE _ AS SECOND PARAMETER
            if (error.status !== 403 && error.status !== 404) {
              // We can send the error to Sentry,
              // or show a notification UI.
              // console.clear();
              errorAlert(`${error.message}`);
              if (error.status === 401) {
                localStorage.clear();
                push('/login');
              }
            }
          },
        }}
      > */}

      <Switch>
        <LazyRoute path="/login">
          {'token' in localStorage ? <Redirect to="/home" /> : <AsyncLogin />}
        </LazyRoute>

        <LazyRoute path="/home">
          {'token' in localStorage ? <AsyncHome />
            : <Redirect to="/login" />}
        </LazyRoute>

        <LazyRoute path="/pdfbyhtml">
          {'token' in localStorage ? <AsyncPDF />
            : <Redirect to="/login" />}
        </LazyRoute>

        {/* NOT FOUND */}
        <LazyRoute path="*">
          {location.pathname === '/'
            ? 'token' in localStorage ? <Redirect to="/home" />
              : <Redirect to="/login" />
            : <AsyncNotFound /> /* DIFFERENT TO "/" */}
        </LazyRoute>
      </Switch>
      <ToastContainer />
      <ServiceWorkerWrapper />
      {/* </SWRConfig> */}
    </Provider>
  );
};

export default App;
