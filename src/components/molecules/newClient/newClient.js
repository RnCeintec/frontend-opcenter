import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import {
  IconClose, IconSearch, IconSelect, IconSpiner,
} from '../../../assets/icons/icons';
import ButtonIcon from '../../atoms/buttons/buttonIcon';
import { useFetch } from '../../../hook';
import { errorAlert, successAlert } from '../../../utils/alertNotify';

const NewClient = ({
  setIsOpenNewClientModal, setClientMutate,
  setClientId,
}) => {
  // FORM VARIABLES
  const {
    register, watch, setValue, clearErrors, handleSubmit, formState: { errors },
  } = useForm();

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const fetchClient = useFetch('client');

  const onSubmit = async (data) => {
    setIsLoadingSubmit(true);
    const dataToSend = {
      rz_social: data.client.trim(),
      direccion: data.address.trim(),
      tipo_documento: data.documentType,
      documento: data.document,
      telefono: data.phone,
      observacion: data.observacion,
    };
    try {
      const [result, status] = await fetchClient.post(dataToSend);
      if (status === 200) {
        successAlert('Registrado correctamente');
        // await setClientMutate(Date.now);
        setClientId(result.result.id);
        setIsOpenNewClientModal(false);
      } else {
        errorAlert('Algo salió mal, vuelva a intentarlo');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full h-full z-50 fixed">
        <div className="flex p-4 pt-6 mt-2 flex-col justify-center absolute z-20 bg-white rounded-xl
      w-11/12 sm:w-5/6 md:w-3/4 lg:w-1/2 xl:w-2/5 max-h-screen"
        >
          <button type="button" onClick={() => setIsOpenNewClientModal(false)} className="absolute right-5 top-3 text-gray-600 hover:text-gray-800 z-40">
            <IconClose />
          </button>
          <p className="text-xl text-center text-gray-700 font-semibold mb-1">Nuevo Cliente</p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

            <div className="flex z-10 text-sm relative">
              <p className="font-semibold text-gray-700 ml-2 pl-1 sm:font-semibold ">Documento</p>
              <p className="text-red-600 pr-1">*</p>
            </div>
            <div className={`flex items-start space-x-2 ${errors?.document || errors?.documentType ? '' : 'mb-2'}`}>
              <label htmlFor="documentType" className="flex flex-col justify-center w-2/5">
                <div className="relative">
                  <select
                    className={`appearance-none bg-white pl-3 py-1 text-sm rounded-xl w-full ring-1 focus:ring-2 focus:outline-none ${errors?.documentType ? 'ring-red-500' : 'ring-blue-400'} ${watch('documentType') === 'select' ? 'text-gray-400' : 'text-gray-800'}`}
                    {...register(
                      'documentType',
                      {
                        validate: {
                          select: (e) => e !== 'select' || 'Campo Obligatorio',
                        },
                      },
                    )}
                  >
                    {/* <option value="select">Seleccionar</option> */}
                    <option value="dni" className="text-gray-700">DNI</option>
                    <option value="ruc" className="text-gray-700">RUC</option>
                    <option value="carnet" className="text-gray-700">Carnet Extr.</option>
                  </select>
                  <span className="absolute right-0 top-1 h-5 w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center rounded-full bg-white">
                    <IconSelect />
                  </span>
                </div>
                <span className="ml-3 text-xs text-red-500">{errors?.documentType?.message}</span>
              </label>
              <div className="w-3/5">
                <label htmlFor="document" className="w-full relative flex flex-col justify-center ">
                  <input
                    placeholder={`Ingresar número de ${watch('documentType') === 'carnet' ? 'Carnet Extr.' : watch('documentType') === 'ruc' ? 'RUC' : 'DNI'}`}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    type="number"
                    className={`${errors?.document ? 'ring-red-500' : 'ring-blue-400'} bg-white pl-3 pr-3 py-1 text-sm rounded-xl w-full ring-1 focus:ring-2 focus:outline-none text-gray-800`}
                    {...register(
                      'document',
                      {
                        validate: {
                          empty: (v) => v !== '' || 'Colocar Número de Documento',
                          dni: (v) => (watch('documentType') === 'dni' ? v.length === 8 : true) || 'DNI debe tener 8 Digitos',
                          ruc: (v) => (watch('documentType') === 'ruc' ? v.length === 11 : true) || 'RUC debe tener 11 Digitos',
                          carnet: (v) => (watch('documentType') === 'carnet' ? v.length === 9 : true) || 'Carnet debe tener 9 Digitos',
                        },
                        pattern: {
                          value: /^[0-9]+$/,
                          message: 'Número de Documento invalido',
                        },
                      },

                    )}
                  />
                  <span className={`${errors?.document ? '' : 'hidden'} pl-2 text-xs text-red-500 mt-0.5`}>
                    {errors?.document?.message}
                  </span>
                </label>
              </div>
            </div>

            <label htmlFor="client" className="w-full relative mt-1 mb-2 flex flex-col justify-center ">
              <div className="flex z-10 text-sm">
                <p className="font-semibold text-gray-700 ml-2 pl-1 sm:font-semibold ">{watch('documentType') === 'ruc' ? 'Razón Social' : 'Nombre del Cliente'}</p>
                <p className="text-red-600 pr-1">*</p>
              </div>
              <input
                placeholder={`Ingresar ${watch('documentType') === 'ruc' ? 'Razón Social' : 'Nombre del Cliente'}`}
                type="text"
                className={`${errors?.client ? 'ring-red-500' : 'ring-blue-400'} bg-white pl-3 pr-3 py-1 text-sm rounded-xl w-full ring-1 focus:ring-2 focus:outline-none text-gray-800`}
                {...register(
                  'client',
                  {
                    required: {
                      value: true,
                      message: 'Nombre requerido',
                    },
                    pattern: {
                      value: /^[a-zA-Z áéíóúüÁÉÍÓÚñÑ]+$/,
                      message: 'Nombre invalido',
                    },
                  },
                )}
              />
            </label>
            <span className={`${errors?.client ? '' : 'hidden'} pl-2 text-xs text-red-500 mb-0.5 -mt-1.5`}>
              {errors?.client?.message}
            </span>

            <div className="flex z-10 text-sm">
              <p className="font-semibold text-gray-700 ml-2 pl-1 sm:font-semibold ">Dirección</p>
              <p className="text-red-600 pr-1">*</p>
            </div>
            <label htmlFor="address" className="w-full relative mb-2 flex flex-col justify-center ">
              <input
                placeholder="Ingresar Dirección"
                type="text"
                className={`${errors?.address ? 'ring-red-500' : 'ring-blue-400'} bg-white pl-3 pr-3 py-1 text-sm rounded-xl w-full ring-1 focus:ring-2 focus:outline-none text-gray-800`}
                {
                ...register(
                  'address',
                  {
                    required: {
                      value: true,
                      message: 'Dirección del Cliente Requerido',
                    },
                  },
                )
                }
              />
            </label>
            <span className={`${errors?.address ? '' : 'hidden'} pl-2 text-xs text-red-500 mb-0.5 -mt-1.5`}>
              {errors?.address?.message}
            </span>

            <div className={`flex items-start space-x-2 ${errors?.phone ? '' : 'mb-2'}`}>
              <div className="w-full">
                <div className="flex z-10 text-sm">
                  <p className=" font-semibold text-gray-700 ml-2 pl-1 sm:font-semibold ">N° Telefono</p>
                </div>
                <label htmlFor="phone" className="w-full relative flex flex-col justify-center ">
                  <input
                    placeholder="Ingresar número de teléfono (opcional)"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    type="number"
                    className={`${errors?.phone ? 'ring-red-500' : 'ring-blue-400'} bg-white pl-3 pr-3 py-1 text-sm rounded-xl w-full ring-1 focus:ring-2 focus:outline-none text-gray-800`}
                    {...register(
                      'phone',
                      {
                        pattern: {
                          value: /^[0-9]+$/,
                          message: 'Teléfono invalido',
                        },
                        validate: {
                          length: (e) => (e !== '' ? e.length === 9 : true) || 'Debe tener 9 digitos',
                        },
                      },
                    )}
                  />
                  <span className={`${errors?.phone ? '' : 'hidden'} pl-2 text-xs text-red-500 mt-0.5`}>
                    {errors?.phone?.message}
                  </span>
                </label>
              </div>
            </div>

            <div className={`flex items-start space-x-2 ${errors?.phone ? '' : 'mb-1'}`}>
              <div className="w-full">
                <div className="flex z-10 text-sm">
                  <p className=" font-semibold text-gray-700 ml-2 pl-1 sm:font-semibold ">Observación</p>
                </div>
                <label htmlFor="observacion" className="w-full relative flex flex-col justify-center ">
                  <input
                    placeholder="Ingresar observación (opcional)"
                    type="text"
                    className={`${errors?.observacion ? 'ring-red-500' : 'ring-blue-400'} bg-white pl-3 pr-3 py-1 text-sm rounded-xl w-full ring-1 focus:ring-2 focus:outline-none text-gray-800`}
                    {...register(
                      'observacion',
                    )}
                  />
                  <span className={`${errors?.observacion ? '' : 'hidden'} pl-2 text-xs text-red-500 mt-0.5`}>
                    {errors?.observacion?.message}
                  </span>
                </label>
              </div>
            </div>

            {/* BUTTONS FINALY */}
            <div className="flex space-x-5 mt-4">
              <button
                type="button"
                onClick={() => setIsOpenNewClientModal(false)}
                disabled={isLoadingSubmit}
                className={`${isLoadingSubmit ? 'cursor-not-allowed' : 'hover:bg-red-600 hover:ring'} border-2 border-red-600 bg-red-500  ring-gray-300 pt-1 pb-1.5 rounded-full w-full focus:outline-none text-white`}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoadingSubmit}
                className={`${isLoadingSubmit ? 'cursor-not-allowed' : 'hover:bg-opacity-100 hover:ring'} border-2 border-primary bg-primary bg-opacity-90  ring-gray-300 pt-1 pb-1.5 rounded-full w-full focus:outline-none text-white`}
              >
                Guardar
              </button>
            </div>
          </form>

        </div>
        {/* THIS DIV IS FOR BLACK BACKGROUND */}
        <div
          className="w-full h-full z-10 bg-gray-600 opacity-60"
        />
      </div>
    </>
  );
};

NewClient.propTypes = {
  setIsOpenNewClientModal: PropTypes.func.isRequired,
  setClientMutate: PropTypes.func.isRequired,
  setClientId: PropTypes.func.isRequired,
};

export default NewClient;
