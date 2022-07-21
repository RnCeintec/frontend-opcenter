import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import FormTextInput from '../../atoms/formInputs/formTextInput';
import { IconClose, IconPhone } from '../../../assets/icons/icons';

const ModalInput = ({
  titleModal, closeFunction, onClickFunction, titleClickFunction, defaultNumber,
}) => {
  // FORM VARIABLES
  const {
    register, watch, reset, setValue, clearErrors, handleSubmit, setFocus, formState: { errors },
  } = useForm({
    defaultValues: {
      phone: defaultNumber,
    },
  });

  const onSubmit = (data) => {
    onClickFunction(data.phone);
  };
  return (
    <>
      <div className="flex items-center justify-center w-full h-full z-50 fixed">
        <div className="flex p-4 pt-6 mt-2 flex-col justify-center absolute z-20 bg-white rounded-md
      w-11/12 sm:w-4/6 md:w-1/2 lg:w-2/5 max-h-screen overflow-y-auto"
        >
          <button type="button" onClick={() => closeFunction()} className="absolute right-3 top-2">
            <IconClose />
          </button>
          <div className="flex flex-col justify-center items-center text-center">
            <h1 className="text-xl font-semibold flex flex-col justify-center items-center">
              {titleModal}
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center mt-3">
            <FormTextInput
              inputName="phone"
              title="Teléfono"
              icon={<IconPhone />}
              placeholder="Ingresar Teléfono"
              options={{
                required: {
                  value: true,
                  message: 'Teléfono requerido',
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Teléfono invalido',
                },
                validate: {
                  length: (e) => (`${e}`).length === 9 || 'Debe tener 9 digitos',
                },
              }}
              type="number"
              register={register}
              errors={errors}
            />
            <button type="submit" className="w-52 bg-primary hover:bg-dark-primary text-white p-1.5 my-4 mb-3 rounded-xl">
              {titleClickFunction}
            </button>
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

ModalInput.propTypes = {
  titleModal: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  onClickFunction: PropTypes.func.isRequired,
  titleClickFunction: PropTypes.string.isRequired,
  closeFunction: PropTypes.func.isRequired,
  defaultNumber: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

ModalInput.defaultProps = {
  defaultNumber: '',
};

export default ModalInput;
