import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import withFetch from './withFetch';
import { IconSpiner } from '../../../assets/icons/icons';
import Context from '../../context/context';

const SelectLocal = ({
  localData,
}) => {
  const { state: { isLocalSelected }, dispatch } = useContext(Context);

  const handleSelectLocal = (idLocal) => {
    const localSelected = localData.filter((item) => item.id === idLocal)[0];
    const dataToAdd = {
      id: localSelected?.id,
      rz_social: localSelected?.rz_social,
      RUC: localSelected?.num_documento,
      codDomicilioFiscal: localSelected?.codDomicilioFiscal,
      businessName: localSelected?.nombre,
      slogan: localSelected?.eslogan,
      address: localSelected?.direccion,
      email: localSelected?.correo,
      city: localSelected?.ciudad,
      phone: localSelected?.telefono,
    };
    localStorage.setItem('localData', JSON.stringify(dataToAdd));
    dispatch({ type: 'SET_IS_LOCAL_SELECTED', payload: true });
    dispatch({ type: 'SET_LOCAL_DATA', payload: dataToAdd });
  };

  useEffect(() => {
    if (isLocalSelected && localData[0] !== 'Loading') {
      // console.log(localData);
      // console.log(JSON.parse(localStorage.getItem('localData')).id);
      try {
        if (JSON.parse(localStorage.getItem('localData')).id) {
          const localSelected = localData.filter((item) => item.id === JSON.parse(localStorage.getItem('localData')).id)[0];
          const dataToAdd = {
            id: localSelected?.id,
            rz_social: localSelected?.rz_social,
            RUC: localSelected?.num_documento,
            codDomicilioFiscal: localSelected?.codDomicilioFiscal,
            businessName: localSelected?.nombre,
            slogan: localSelected?.eslogan,
            address: localSelected?.direccion,
            email: localSelected?.correo,
            city: localSelected?.ciudad,
            phone: localSelected?.telefono,
          };
          if (dataToAdd.id) {
            localStorage.setItem('localData', JSON.stringify(dataToAdd));
          }
        } else {
          localStorage.removeItem('localData');
          dispatch({ type: 'SET_IS_LOCAL_SELECTED', payload: false });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [localData]);

  return (
    <>
      {!isLocalSelected
        && (
          <div className="flex items-center justify-center w-full h-full z-50 fixed">
            <div className="flex sm:px-5 py-5 flex-col justify-center absolute z-20 bg-white rounded-xl
      w-11/12 sm:w-4/6 md:w-1/2 lg:w-2/5 max-h-screen overflow-y-auto"
            >

              <div className="flex flex-col justify-center items-center text-center">
                <h1 className="flex flex-col justify-center items-center text-xl font-semibold">
                  Seleccionar Tienda Actual
                </h1>
              </div>
              <div className="flex flex-col space-y-4 mt-3 max-h-96 px-5 py-3 overflow-y-auto">
                {Array.isArray(localData) && localData[0] === 'Loading'
                  ? (
                    <span className="flex justify-center">
                      <IconSpiner medium dark />
                    </span>
                  )
                  : (Array.isArray(localData) && localData.length === 0)
                    || !Array.isArray(localData)
                    ? (
                      <div className="">
                        No hay Tiendas Disponibles
                      </div>
                    )
                    : (
                      <>
                        {localData.map((item) => (
                          <button
                            type="button"
                            onClick={() => handleSelectLocal(item.id)}
                            className="flex items-center space-x-4 py-1 px-3 ring-2 hover:ring-4 ring-blue-400 text-gray-800 rounded-xl"
                          >
                            <p className="whitespace-nowrap font-semibold">
                              {`ID: ${item.id}`}
                            </p>
                            <div className="text-left">
                            <div className="flex flex-wrap">
                                <p className="mr-1.5 font-semibold">
                                  Tienda:
                                </p>
                                <p className="capitalize">{item.nombre}</p>
                              </div>
                              {/* <div className="flex flex-wrap">
                                <p className="mr-1.5 font-semibold">
                                  Ciudad:
                                </p>
                                <p className="capitalize">{item.ciudad}</p>
                              </div> */}
                              <div className="flex flex-wrap">
                                <p className="mr-1.5 font-semibold">
                                  Dirección:
                                </p>
                                <p className="capitalize">
                                  {item.direccion}
                                </p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </>
                    )}
              </div>
            </div>
            {/* THIS DIV IS FOR BLACK BACKGROUND */}
            <div
              className="w-full h-full z-10 bg-gray-600 opacity-60"
            />
          </div>
        )}
    </>
  );
};

SelectLocal.propTypes = {
  localData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.shape()),
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};

export default withFetch(SelectLocal);
