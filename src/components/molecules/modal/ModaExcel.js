import React from 'react';
import PropTypes from 'prop-types';
import ExportExcel from 'react-export-excel';
import dayjs from 'dayjs';
import { IconSpiner, IconClose } from '../../../assets/icons/icons';

const { ExcelFile, ExcelSheet, ExcelColumn } = ExportExcel;

const ModalExcel = ({
  close, titleFirstOption,
  colorFirstButton, isLoading, dataExcel,
}) => (
  <>
    <div className="flex items-center justify-center w-full h-full z-50 fixed">
      <div className="flex p-4 py-6 mt-2 flex-col justify-center absolute z-20 bg-white rounded-md
      w-11/12 sm:w-4/6 md:w-1/2 lg:w-2/5 max-h-screen overflow-y-auto"
      >
        <button type="button" onClick={() => close()} className="absolute right-2 top-2 focus:outline-none">
          <IconClose />
        </button>
        <div className="flex flex-col justify-center items-center text-center">
          {isLoading
            ? (
              <div className="text-xl font-semibold flex justify-center items-center pt-10 pb-10">
                <IconSpiner dark medium />
                <p className="ml-1">Generando Archivo...</p>
              </div>
            )
            : (
              <div className="text-xl font-semibold flex justify-center items-center pt-3">
                <p className="ml-1">Archivo Generado con Exito!</p>
              </div>
            )}
          <h1 className="flex flex-col justify-center items-center">
            {' '}
          </h1>
        </div>
        {!isLoading
          && (
            <div className="flex justify-center items-center my-3">
              <ExcelFile
                element={(
                  <button
                    type="button"
                    className={`py-1 px-3 bg-${colorFirstButton} opacity-90 hover:opacity-100 text-white rounded-md`}
                  >
                    {titleFirstOption}
                  </button>
                )}
                filename="Reporte de Ventas"
              >
                <ExcelSheet data={dataExcel} name="Reporte">
                  <ExcelColumn label="ID" value="id" />
                  <ExcelColumn label="Estado" value="paymentStatus" />
                  <ExcelColumn label="Metodo" value="paymentType" />
                  <ExcelColumn label="Monto" value="monto" />
                  <ExcelColumn label="Monto Final" value="finalAmount" />
                  <ExcelColumn label="Plan" value="plan" />
                  <ExcelColumn label="ID Usuario" value={(item) => item.user.id} />
                  <ExcelColumn label="Nombre Usuario" value={(item) => `${item.user.firstname} ${item.user.lastname}`} />
                  <ExcelColumn label="Fecha Vencimiento" value={(item) => dayjs(item.fecha_venciminiento).format('DD/MM/YYYY')} />
                  <ExcelColumn label="Telefono" value="telefono" />
                  <ExcelColumn label="Dominio" value="dominio" />
                </ExcelSheet>
              </ExcelFile>
            </div>
          )}
      </div>
      {/* THIS DIV IS FOR BLACK BACKGROUND */}
      <div
        className="w-full h-full z-10 bg-gray-600 opacity-60"
      />
    </div>

  </>
);

ModalExcel.propTypes = {
  close: PropTypes.func.isRequired,
  titleFirstOption: PropTypes.string.isRequired,
  colorFirstButton: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  dataExcel: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

ModalExcel.defaultProps = {
  colorFirstButton: 'green-500',
};

export default ModalExcel;
