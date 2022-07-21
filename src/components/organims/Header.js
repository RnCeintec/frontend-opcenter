/* eslint-disable no-empty-pattern */
/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import {
  IconUser, IconNotificacion, IconAlert, IconLogOut, IconConfig,
} from '../../assets/icons/icons';
import Context from '../context/context';
import ModalTwoOptions from '../molecules/modal/ModalTwoOptions';
import { infoAlert, successAlert } from '../../utils/alertNotify';
import SelectLocal from '../molecules/selectLocal/selectLocal';
import ClientConfig from '../molecules/clientConfig/clientConfig';

const Header = ({
  // countNotificationTickets,
  // countNotificationSales,
  // setIsNotification,
}) => {
  const [isOpenModalLogout, setIsOpenModalLogout] = useState(false);
  const [isOpenModalConfig, setIsOpenModalConfig] = useState(false);
  const { state: { page }, dispatch } = useContext(Context);

  const { push } = useHistory();

  const handleLogOut = () => {
    successAlert('Sesión Terminada');
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('cart');
    localStorage.removeItem('role');
    localStorage.removeItem('adminMode');
    // localStorage.removeItem('localData');
    dispatch({ type: 'SET_IS_LOCAL_SELECTED', payload: false });
    if (page === 'BILLING' || page === 'USERS') {
      dispatch({ type: 'SET_PAGE', payload: 'HOME' });
    }
    push('/login');
  };

  // const countNotification = countNotificationTickets; // + countNotificationSales;

  // const handleClickNotification = () => {
  //   if (countNotification > 0) {
  //     dispatch({ type: 'SET_PAGE', payload: 'TICKET' });
  //     setIsNotification(true);
  //   } else {
  //     infoAlert('Sin tickets pendientes');
  //   }
  // };

  return (
    <>
      {isOpenModalLogout
        && (
          <ModalTwoOptions
            titleModal={(
              <>
                <div className="-mt-2 flex justify-center items-center text-center text-yellow-500 w-20"><IconAlert /></div>
                <p className="-mt-2">¿Está seguro</p>
                <p className="pb-2">de Cerrar Sesión?</p>
              </>
            )}
            titleFirstOption="   Cancelar   " // SPACES with alt + 0160
            titleSecondOption="Cerrar Sesión"
            onClickFirstOption={() => setIsOpenModalLogout(false)}
            onClickSecondOption={() => handleLogOut()}
            colorFirstButton="red-500"
          />
        )}

      <SelectLocal />

      {isOpenModalConfig
        && <ClientConfig setIsOpenModalConfig={setIsOpenModalConfig} />}

      <div className="flex justify-end w-full h-12 bg-gray-800">
        <button
          type="button"
          className="my-2 mr-1.5 flex items-center bg-white rounded-full focus:outline-none focus:ring-2 ring-gray-400 "
          onClick={() => setIsOpenModalConfig(true)}
        >
          <p className="capitalize mr-2 ml-3 font-semibold text-gray-800 max-w-40 sm:max-w-none truncate">{localStorage.getItem('name')}</p>
          <div className="p-1.5 flex rounded-full bg-gray-200 relative">
            <IconConfig />
          </div>
        </button>
        <button
          type="button"
          className="my-2 mr-4 flex items-center rounded-full focus:outline-none  relative pr-1 md:pr-1.5 group"
          onClick={() => setIsOpenModalLogout(true)}
        >
          <div
            className="p-1.5 flex bg-white rounded-full"
          >
            <span className="w-5 h-5 group-hover:text-red-600">
              <IconLogOut />
            </span>
            {/* {countNotification > 0
              && (
                <>
                  <span className="w-3 h-3 sm:w-4 sm:h-4 animate-ping bg-yellow-500 rounded-full absolute top-0.5 right-0.5" />
                  <span
                    className="flex items-center justify-center text-white text-xs font-semibold bg-yellow-500 rounded-full h-4 sm:h-5 w-4 sm:w-5 absolute top-0 right-0"
                  >
                    {countNotification}
                  </span>
                </>
              )} */}
          </div>
        </button>
      </div>
    </>
  );
};

Header.propTypes = {
  // countNotificationSales: PropTypes.number.isRequired,
  // countNotificationTickets: PropTypes.number.isRequired,
  // setIsNotification: PropTypes.func.isRequired,
};

export default Header;
