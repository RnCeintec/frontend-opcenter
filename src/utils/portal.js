// import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }) => {
  const mount = document.getElementById('modalRoot');
  // const el = document.createElement('div');

  return createPortal(children, mount);
};

export default Portal;
