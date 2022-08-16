/* eslint-disable max-len */
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { IconCategory, IconClose, IconProduct } from '../../../assets/icons/icons';
import ButtonCant from '../../atoms/buttons/buttonCant';
import Context from '../../context/context';

const Product = ({ item, handleDeleteProduct, handleChangeCant }) => {
  const [price, setPrice] = useState(parseFloat(item.price).toFixed(2));
  const [totalPrice, setTotalPrice] = useState((parseFloat(item.price * item.cant)).toFixed(2));
  const { cart, setCart } = useContext(Context);

  const handleChangePrice = (e) => {
    const { value } = e.target;
    if (!Number.isNaN(value * 2)) {
      setPrice(value);
      setTotalPrice((value * item.cant).toFixed(2));
      const cartLocal = JSON.parse(localStorage.getItem('cart'));
      const product = cartLocal.filter((itemProduct) => itemProduct.id === item.id)[0];
      const indexToEdit = cartLocal.findIndex((itemProduct) => itemProduct.id === item.id);
      const productToAdd = {
        ...product,
        price:
          (Number.isNaN(parseFloat(value))
            ? parseFloat(0).toFixed(2) : parseFloat(value).toFixed(2)),
      };
      cartLocal.splice(indexToEdit, 1, productToAdd);
      localStorage.setItem('cart', JSON.stringify(cartLocal));
      setCart(cartLocal);
    }
  };

  // <-------- UNCOMMENT TO EDIT TOTAL ---------->
  // const handleChangeTotalPrice = (e) => {
  //   const { value } = e.target;
  //   setTotalPrice(value);
  //   setPrice((value / item.cant).toFixed(2));
  //   const cartLocal = JSON.parse(localStorage.getItem('cart'));
  //   const product = cartLocal.filter((itemProduct) => itemProduct.id === item.id)[0];
  //   const indexToEdit = cartLocal.findIndex((itemProduct) => itemProduct.id === item.id);
  //   const productToAdd = { ...product, price: ((parseFloat(value / item.cant)).toFixed(2)) };
  //   cartLocal.splice(indexToEdit, 1, productToAdd);
  //   localStorage.setItem('cart', JSON.stringify(cartLocal));
  //   setCart(cartLocal);
  // };

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem('cart'));
    const product = cartLocal.filter((itemProduct) => itemProduct.id === item.id)[0];
    // COUNT PRODUCTS
    setPrice(parseFloat(price).toFixed(2));
    setTotalPrice(parseFloat(product.price * product.cant).toFixed(2));
  }, [item.cant]);

  return (
    <div key={item.id} className=" rounded-xl border border-gray-300 shadow bg-white relative">
      <button type="button" onClick={() => handleDeleteProduct(item.id)} className="group absolute top-1.5 right-1.5 rounded-full ring-1 ring-red-500 hover:bg-red-500 h-5 w-5 flex items-center justify-center">
        <span className="text-red-600 group-hover:text-white h-4 w-4"><IconClose autosize /></span>
      </button>
      <div className="pl-3 pr-6 py-1">
        <p className="text-xs -mb-0.5 truncate">
          {item.cod}
        </p>
        <div className="-ml-0.5 flex items-center space-x-1 text-sm truncate">
          <span className="w-3.5">
            <IconProduct autosize />
          </span>
          <p>{item.product}</p>
        </div>
        <div className="flex items-center space-x-1 text-xs text-gray-400 ">
          <span className="w-3">
            <IconCategory autosize />
          </span>
          <p className="lowercase capitalize-first">{item.category}</p>
        </div>
      </div>
      <div className="border-b border-gray-300">{' '}</div>
      <div className="px-3.5 py-2 flex justify-between items-center space-x-2">
        <ButtonCant
          handleChangeCant={handleChangeCant}
          cantidad={item.cant}
          idProduct={item.id}
        />
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="price" className="flex w-full items-center ">
            <p className="text-xs text-gray-400 whitespace-nowrap mr-1 text-right w-2/5">Precio Und.</p>
            <input
              // inputMode="decimal" // UNCOMMENT TO EDIT
              // pattern="[0-9.]*" // UNCOMMENT TO EDIT
              // type="number"// UNCOMMENT TO EDIT
              type="text"
              // readOnly
              value={price}
              // onChange={(e) => handleChangePrice(e)} // UNCOMMENT TO EDIT
              // onBlur={(e) => (e.target.value === '' // UNCOMMENT TO EDIT
              //   ? handleChangePrice({ target: { value: 0 } }) // UNCOMMENT TO EDIT
              //   : setPrice(parseFloat(price).toFixed(2)))} // UNCOMMENT TO EDIT
              // className="ring-1 ring-blue-400 rounded-lg focus:outline-none px-1.5 py-0 w-3/5" // UNCOMMENT TO EDIT
              className="ring-1 ring-blue-400 bg-gray-100 text-gray-600 rounded-lg focus:outline-none px-1.5 py-0 w-3/5 cursor-auto"
            />
          </label>
          <label htmlFor="price" className="flex w-full items-center ">
            <p className="text-xs text-gray-400 whitespace-nowrap mr-1 text-right w-2/5">Total</p>
            <input
              type="text"
              readOnly
              value={totalPrice}
              // onChange={(e) => handleChangeTotalPrice(e)} // UNCOMMENT TO EDIT
              className="ring-1 ring-blue-400 bg-gray-100 text-gray-600 rounded-lg focus:outline-none px-1.5 py-0 w-3/5 cursor-auto"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  item: PropTypes.shape().isRequired,
  handleChangeCant: PropTypes.func.isRequired,
  handleDeleteProduct: PropTypes.func.isRequired,
};

export default Product;
