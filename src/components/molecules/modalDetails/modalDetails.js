import PropTypes from 'prop-types';
import { IconClose } from '../../../assets/icons/icons';
// import { Fragment } from 'react';

const ModalDetails = ({
  setIsOpenModalDetails,
  detailsData,
}) => {
  const handleCloseModal = () => {
    setIsOpenModalDetails(false);
  };

  const { salesDetails } = detailsData;

  // console.log(detailsData);

  // const isPar = (value) => {
  //   if (value % 2 === 0) {
  //     return true;
  //   }
  //   return false;
  // };

  return (
    <div className="flex items-center justify-center w-full h-full z-50 fixed">
      {/* THIS IS THE MODAL */}
      <div className="flex p-4 pt-6 mt-2 flex-col  justify-center absolute z-20 bg-white rounded-md
      w-11/12 sm:w-5/6 lg:w-4/6 max-h-screen overflow-y-auto"
      >
        {/* THIS IS CLOSE BUTTON */}
        <button type="button" onClick={() => handleCloseModal()} className="absolute right-3 top-2">
          <IconClose />
        </button>

        <div className="flex items-center justify-center text-2xl font-semibold text-gray-800 uppercase w-full mb-2.5">Detalle de Venta</div>

        <div className="max-h-60 lg:max-h-72  overflow-y-auto">

          <table className="table-fixed min-w-full mb-2.5">
            <thead>
              <tr className="bg-blue-200 text-sm md:text-base ">
                <th className="w-1/2 border border-gray-400 px-2 ">Descripcion</th>
                <th className="w-1/12 border border-gray-400 px-2 ">Precio</th>
                <th className="w-1/12 border border-gray-400 px-2 ">Cant.</th>
                <th className="w-1/12 border border-gray-400 px-2  ">Total</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(salesDetails)
                ? salesDetails.map((item) => (
                  <tr key={item.titulo} className="text-xs md:text-sm">
                    <td className="border border-gray-400 px-2">{`${item?.product?.descripcion}`}</td>
                    <td className="border border-gray-400 px-2 text-right">{(+item?.salePrice).toFixed(2)}</td>
                    <td className="border border-gray-400 px-2 text-center">{item?.cantidad}</td>
                    <td className="border border-gray-400 px-2 text-right">{(item?.salePrice * item?.cantidad).toFixed(2)}</td>
                  </tr>
                ))
                : ''}
            </tbody>
          </table>
          {!Array.isArray(salesDetails) && (
            <div className="flex items-center justify-center py-8 italic text-gray-700">
              No se Encontraron Resultados
            </div>
          )}
        </div>
        <div className="flex mx-3 justify-end text-sm md:text-base">
          <div className="font-semibold mr-3">SubTotal:</div>
          <div>{(+detailsData?.subtotal).toFixed(2)}</div>
        </div>
        <div className="flex mx-3 justify-end text-sm md:text-base">
          <div className="font-semibold mr-3">IGV:</div>
          <div>{(+detailsData?.igv).toFixed(2)}</div>
        </div>
        <div className="flex mx-3 justify-end text-sm md:text-base">
          <div className="font-semibold mr-3">Total Final:</div>
          <div>{(+detailsData?.total).toFixed(2)}</div>
        </div>
      </div>

      {/* THIS DIV IS FOR BLACK BACKGROUND */}
      <div
        className="w-full h-full z-10 bg-gray-600 opacity-60"
      />
    </div>
  );
};

ModalDetails.propTypes = {
  setIsOpenModalDetails: PropTypes.func.isRequired,
  detailsData: PropTypes.shape().isRequired,
  // comprobanteData: PropTypes.shape().isRequired,
  // setDetailsData: PropTypes.func.isRequired,
  // dataTemplate: PropTypes.oneOfType([
  //   PropTypes.shape(),
  //   PropTypes.arrayOf(PropTypes.shape()),
  // ]).isRequired,
};

export default ModalDetails;
