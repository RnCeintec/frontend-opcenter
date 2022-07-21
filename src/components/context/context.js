import { createContext, useReducer, useState } from 'react';
import PropTypes from 'prop-types';

const Context = createContext();

export const init = {
  page: 'HOME',
  isLocalSelected: ('localData' in localStorage),
  localData:
    'localData' in localStorage
      ? JSON.parse(localStorage.getItem('localData'))
      : {
        id: '',
        rz_social: '',
        RUC: '',
        codDomicilioFiscal: '',
        businessName: '',
        slogan: '',
        address: '',
        email: '',
        city: '',
        phone: '',
      },
  saleData:
    'lastSale' in localStorage
      ? JSON.parse(localStorage.getItem('lastSale'))
      : {
        tipoComprobante: '',
        numComprobante: '',
        client: '',
        clientDoc: '',
        clientTypeDoc: '',
        clientAddress: '',
        date: '',
        products: [],
        payType: '',
        amount: 0.0,
      },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_IS_LOCAL_SELECTED':
      return { ...state, isLocalSelected: action.payload };
    case 'SET_LOCAL_DATA':
      return { ...state, localData: action.payload };
    case 'SET_SALE_DATA':
      return { ...state, saleData: action.payload };
    default:
      return { ...state };
  }
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, init);
  const [actualNotify, setActualNotify] = useState(null);
  const [isResponding, setIsResponding] = useState(false);
  const [cart, setCart] = useState([]);
  // const [pdfByHtmlData, setPdfByHtmlData] = useState(
  //   {
  //     tipoComprobante: '',
  //     numComprobante: '',
  //     client: '',
  //     clientDoc: '',
  //     clientTypeDoc: '',
  //     clientAddress: '',
  //     date: '',
  //     products: [],
  //     payType: '',
  //     payCant: 1,
  //     amount: 0.0,
  //   },
  // );
  return (
    <Context.Provider value={{
      state,
      dispatch,

      actualNotify,
      setActualNotify,
      isResponding,
      setIsResponding,
      cart,
      setCart,
      // pdfByHtmlData,
      // setPdfByHtmlData,
    }}
    >
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Context;
