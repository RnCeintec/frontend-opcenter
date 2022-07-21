import { Redirect } from 'react-router-dom';

const withTokenValidate = (Component) => (props) => {
  if ('token' in localStorage) return <Component {...props} />;
  return <Redirect to="/login" />;
};

export default withTokenValidate;
