import PropTypes from 'prop-types';
import { useState } from 'react';
import { IconMinus, IconPlus } from '../../../assets/icons/icons';

const ButtonCant = ({
  cantidad, handleChangeCant, idProduct,
}) => {
  const [cant, setCant] = useState(cantidad);

  const incCant = () => (
    cant < 100
      ? (setCant(cant + 1), handleChangeCant(idProduct, cant + 1))
      : setCant(100)
  );

  const decCant = () => (
    cant > 1
      ? (setCant(cant - 1), handleChangeCant(idProduct, cant - 1))
      : setCant(1)
  );

  return (
    <div className="flex justify-center">
      <button type="button" onClick={decCant} className="flex items-center justify-center h-7 w-7 hover:bg-blue-400 ring-1 ring-blue-400 text-blue-400 hover:text-white rounded-full focus:outline-none">
        <IconMinus />
      </button>
      <input
        type="text"
        className="h-7 w-7 text-center focus:outline-none mx-0.5"
        value={cant}
        readOnly
      />
      <button type="button" onClick={incCant} className="flex items-center justify-center h-7 w-7 hover:bg-blue-400 ring-1 ring-blue-400 text-blue-400 hover:text-white rounded-full focus:outline-none">
        <IconPlus />
      </button>
    </div>
  );
};

ButtonCant.propTypes = {
  cantidad: PropTypes.number.isRequired,
  handleChangeCant: PropTypes.func.isRequired,
  idProduct: PropTypes.number.isRequired,
};

export default ButtonCant;
