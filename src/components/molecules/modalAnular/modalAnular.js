import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import FormTextInput from '../../atoms/formInputs/formTextInput';
import FormSelectInput from '../../atoms/formInputs/formSelectInput';
import {
  IconBilling,
  IconClose, IconComputer, IconInfo, IconObservation, IconPhone,
} from '../../../assets/icons/icons';
import { optionsNotaCredito, optionsNotaDebito } from '../../../config';

const ModalAnular = ({
  billingData,
  idToDelete,
  onClickFirstOption,
  onClickSecondOption,
  isLoadSecondOption,
}) => {
  const comprobante = billingData?.filter((item) => item.id === idToDelete)[0];
  // FORM VARIABLES
  const {
    register, watch, reset, setValue, clearErrors, handleSubmit, setFocus, formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    onClickSecondOption(data);
  };

  useEffect(() => {
    setValue('comprobante', `${(comprobante.ventas.tipo_comprobante).toUpperCase()} – ${comprobante.ventas.comprobante}`);
  }, []);

  return (
    <>
      <div className="flex items-center justify-center w-full h-full z-50 fixed">
        <div className="flex p-4 pt-6 mt-2 flex-col justify-center absolute z-20 bg-white rounded-md
      w-11/12 sm:w-4/6 md:w-1/2 lg:w-2/5 max-h-screen overflow-y-auto"
        >
          <button type="button" onClick={() => onClickFirstOption()} className="absolute right-3 top-2">
            <IconClose />
          </button>
          <div className="flex flex-col justify-center items-center text-center">
            <h1 className="text-xl font-semibold flex flex-col justify-center items-center whitespace-pre">
              {`Generar Nota de Credito\n(Anulacion de ${billingData[0]?.tipo_comprobante})`}
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center mt-3">
            <FormTextInput
              inputName="comprobante"
              title="Comprobante"
              icon={<IconBilling />}
              placeholder="Error al obtener Comprobante"
              disabled
              errors={errors}
              register={register}
            />
            <FormSelectInput
              inputName="tipoNota"
              title="Tipo de Nota"
              icon={<IconComputer />}
              placeholder="Seleccione tipo de Nota"
              options={{
                validate: {
                  value: (e) => e !== 'select' || 'Tipo de Operación Requerido',
                },
                onChange: () => setValue('motivo', 'select'),
              }}
              register={register}
              errors={errors}
              watch={watch}
            >
              <option value="07" className="text-gray-700">Nota de Crédito</option>
              <option value="08" className="text-gray-700">Nota de Débito</option>

            </FormSelectInput>

            <FormSelectInput
              inputName="motivo"
              title="Motivo"
              icon={<IconObservation />}
              placeholder="Seleccione Motivo"
              options={{
                validate: {
                  value: (e) => e !== 'select' || 'Motivo Requerido',
                },
              }}
              register={register}
              errors={errors}
              watch={watch}
            >
              {watch('tipoNota') === '07'
                ? (optionsNotaCredito.map((item) => <option key={item.value} value={item.value} className="text-gray-700">{item.name}</option>))
                : (optionsNotaDebito.map((item) => <option key={item.value} value={item.value} className="text-gray-700">{item.name}</option>))}
            </FormSelectInput>
            {/*
            <FormTextInput
              inputName="comment"
              title="Sustento de Anulación"
              icon={<IconObservation />}
              placeholder="Escriba un Sustento del Motivo"
              options={{
                required: {
                  value: true,
                  message: 'Sustento Requerido',
                },
              }}
              register={register}
              errors={errors}
            /> */}

            <div className="flex w-11/12 justify-center mt-2">
              <button
                type="button"
                onClick={() => onClickFirstOption()}
                className="w-1/2 bg-red-500 hover:bg-red-600 text-white p-1.5 my-4 mb-3 mr-5 rounded-xl"
              >
                Cancelar
              </button>
              <button type="submit" className="w-1/2 bg-primary hover:bg-dark-primary text-white p-1.5 my-4 mb-3 rounded-xl whitespace-nowrap">
                Generar Nota
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

ModalAnular.propTypes = {
  billingData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  idToDelete: PropTypes.number.isRequired,
  onClickFirstOption: PropTypes.func.isRequired,
  onClickSecondOption: PropTypes.func.isRequired,
  isLoadSecondOption: PropTypes.bool.isRequired,
};

// ModalAnular.defaultProps = {
//   defaultNumber: '',
// };

export default ModalAnular;
