/* eslint-disable react/prop-types */
//
import React, { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  IconClose, IconFirst, IconLast, IconNext, IconPrev, IconSearch, IconSelect, IconSpiner,
} from '../../../assets/icons/icons';
import ButtonIcon from '../../atoms/buttons/buttonIcon';
import withFetch from './withFetch';
import Context from '../../context/context';
import { warningAlert } from '../../../utils/alertNotify';
import Pagination from '../../atoms/buttons/paginationButtons';

const SearchByCategory = ({
  setIsOpenSearchByCategoryModal,
  isLoadingSearchCategory,
  setIsLoadingSearchCategory,
  isLoadingSearchProduct,
  setIsLoadingSearchProduct,
  categoryActive,
  setCategoryActive,
  categoriesData,
  productsData,
  setSearchCategory,
  setSearchProduct,
  searchProduct,
  setLimitProduct,
  page,
  pageRange,
  nextPage,
  previusPage,
  jumpToPage,
  jumpToFirstPage,
  jumpToLastPage,
  lastPage,
}) => {
  const [isOpenSearchListCategory, setIsOpenSearchListCategory] = useState(false);
  const [dataCategorySelected, setDataCategorySelected] = useState(null);
  const { cart, setCart } = useContext(Context);
  const refCategory = useRef(null);
  const refProduct = useRef(null);

  const handleCleanSearchCategory = () => {
    if (!isOpenSearchListCategory) {
      setDataCategorySelected(null);
      refCategory.current.value = '';
      setSearchCategory('');
    } else if (dataCategorySelected) {
      refCategory.current.value = dataCategorySelected.descripcion;
      setSearchCategory(dataCategorySelected.descripcion);
    } else {
      refCategory.current.value = '';
      setSearchCategory('');
    }
    setIsOpenSearchListCategory(false);
  };

  const handleCleanSearchProduct = () => {
    setSearchProduct('');
    refProduct.current.value = '';
    refProduct.current.focus();
  };

  const handleChangeCategory = () => {
    const category = refCategory.current.value;
    setIsLoadingSearchCategory(true);
    setSearchCategory(category);
    setIsOpenSearchListCategory(true);

    // DELETE THIS IF PEOPLE WANT SEE ALL PRODUCTS
    // if (!product) {
    //   setIsOpenSearchListCategory(false);
    // }
  };

  // WRITTING word to search
  const handleChangeProduct = (event) => {
    const { value } = event.target;
    // VERIFY IF KEYWORD WITH "/" or "\" AND START/END SPACES
    let search = value.split('/').join(' ');
    search = search.split('\\').join(' ');
    search = search.trim();
    setSearchProduct(search);
  };

  const handleSelectCategory = (idValue) => {
    const dataToInsert = categoriesData.filter((item) => item.id === idValue)[0];
    setDataCategorySelected(dataToInsert);
    refCategory.current.value = dataToInsert.descripcion;
    setCategoryActive(dataToInsert.descripcion);
    setSearchCategory(dataToInsert.descripcion);
    setIsOpenSearchListCategory(false);
  };

  // <----- SELECT AN ELEMENT OF THE SEARCH -------->
  const handleSelectProduct = (idValue) => {
    const product = productsData.filter((item) => item.id === idValue)[0];
    const productToAdd = {
      id: product.id,
      cod: product.codigo,
      product: product.descripcion,
      category: product.category.descripcion,
      // precioCompra: product.precio_compra,
      price: product.precio_sugerido,
      cant: 1,
    };
    // FINAL TODO

    if ('cart' in localStorage) {
      let cartLocal = JSON.parse(localStorage.getItem('cart'));
      if (cartLocal.filter((item) => item.id === idValue).length === 0) {
        cartLocal = [...cartLocal, productToAdd];
        localStorage.setItem('cart', JSON.stringify(cartLocal));
        setCart(cartLocal);
        setIsOpenSearchByCategoryModal(false);
      } else {
        warningAlert('El producto ya existe en el pedido');
      }
    } else {
      localStorage.setItem('cart', JSON.stringify([productToAdd]));
      setCart([productToAdd]);
    }
  };

  // <--------- CANT ROWS FUNCTIONS --------->
  const handleChangeCantView = (e) => {
    const { value } = e.target;
    setLimitProduct(value);
  };

  return (
    <>
      <div className="flex items-center justify-center w-full h-full z-50 fixed">
        <div className="flex p-4 pt-6 mt-2 flex-col justify-center absolute z-20 bg-white rounded-xl
      w-11/12 sm:w-5/6 md:w-3/4 lg:w-1/2 max-h-screen"
        >
          <button type="button" onClick={() => setIsOpenSearchByCategoryModal(false)} className="absolute right-5 top-3 text-gray-600 hover:text-gray-800 z-40">
            <IconClose />
          </button>
          <p className="font-semibold text-gray-600 ml-3 mb-1 sm:font-semibold text-center text-xl">Buscar por Categoria</p>

          <div className="flex flex-col justify-center items-center text-center">
            {/* Category */}
            <label htmlFor="category" className="w-full relative mt-1 mb-2 flex flex-col justify-center ">
              <p className="font-semibold text-gray-600 ml-3 mb-1 sm:font-semibold text-left">Categoria</p>
              <div className="flex items-center">
                <input
                  ref={refCategory}
                  placeholder="Elegir Categoria"
                  type="text"
                  onChange={() => {
                    setIsLoadingSearchCategory(true);
                    setTimeout(() => {
                      handleChangeCategory();
                    }, 1000);
                  }}
                  // eslint-disable-next-line max-len
                  onClick={() => setIsOpenSearchListCategory(true)} // SHOW THIS IF PEOPLE WANT SEE ALL PRODUCTS
                  className={`${isOpenSearchListCategory ? 'rounded-b-none' : 'rounded-b-xl'} bg-white pl-4 pr-8 pt-1 pb-1.5 rounded-t-xl w-full ring-blue-400 ring-1 focus:ring-2 focus:outline-none text-gray-800`}
                />
                {isOpenSearchListCategory
                  ? isLoadingSearchCategory
                    ? (
                      <span className="absolute right-1 top-3.5 h-full w-7 text-center text-gray-600 flex items-center justify-center">
                        <IconSpiner dark mini />
                      </span>
                    )
                    : (
                      <span className="absolute right-1 top-3.5 h-full w-7 text-center text-gray-600 flex items-center justify-center">
                        <ButtonIcon
                          icon={(<IconClose />)}
                          isColorHover
                          colorHover="primary"
                          colorText="gray-600"
                          padding={1}
                          onClick={() => handleCleanSearchCategory()}
                        />
                      </span>
                    )
                  : (
                    <span className="absolute right-1 top-3.5 h-full w-7 text-center text-gray-600 flex items-center justify-center">
                      <IconSearch />
                    </span>
                  )}
                {isOpenSearchListCategory
                  && (
                    <div className="flex flex-col w-full bg-white absolute top-16 z-10 rounded-b-xl ring-blue-400 ring-2 pb-2 max-h-96 overflow-auto">
                      {Array.isArray(categoriesData) && categoriesData[0] === 'loading'
                        ? <div className="w-full flex justify-center pb-1 pt-2"><IconSpiner primary /></div>
                        : !Array.isArray(categoriesData) || categoriesData.length === 0
                          ? <div className="w-full flex justify-center pt-1.5 pb-0.5 italic text-gray-400">Sin Resultados</div>
                          : categoriesData.map((item, i) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => handleSelectCategory(item.id)}
                              className={`${(categoriesData.length - 1) !== i ? 'border-b' : ''} pl-2 p-1 flex flex-wrap justify-start capitalize w-full hover:bg-blue-500 hover:text-white`}
                            >
                              <p className="text-left">{item.descripcion}</p>
                            </button>
                          ))}
                    </div>
                  )}
              </div>
            </label>
          </div>
          <div className="flex flex-col justify-center mt-3">
            <p className="font-semibold text-gray-600 ml-3 mb-1 sm:font-semibold text-left">Escoger Producto</p>
            <div className="w-full mb-2">
              <div className="flex rounded-t-xl border border-blue-400 p-1.5">
                <div className="flex relative w-1/3 sm:w-20 mr-3">
                  <select
                    onChange={(e) => handleChangeCantView(e)}
                    className="rounded-xl border appearance-none bg-white border-gray-300 py-1 w-full focus:outline-none focus:border-blue-400 text-base pl-3 pr-4"
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                  <span className="absolute right-0 top-0 h-full w-7 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <IconSelect />
                  </span>
                </div>
                <div
                  className="flex flex-row justify-end w-full sm:w-auto relative "
                >
                  <input
                    ref={refProduct}
                    className="pl-3 pr-8 p-1 w-full bg-white rounded-xl appearance-none focus:outline-none border border-gray-300 focus:border-blue-400"
                    type="text"
                    placeholder="Buscar"
                    onChange={(e) => {
                      setTimeout(() => {
                        if (categoryActive) setIsLoadingSearchProduct(true);
                        handleChangeProduct(e);
                      }, 1000);
                    }}
                  />
                  {searchProduct === ''
                    ? (
                      <span className="absolute right-1 top-0 h-full w-7 text-center text-gray-600 flex items-center justify-center">
                        <IconSearch />
                      </span>
                    )
                    : isLoadingSearchProduct
                      ? (
                        <span className="absolute right-1 top-0 h-full w-7 text-center text-gray-600 flex items-center justify-center">
                          <IconSpiner mini dark />
                        </span>
                      )
                      : (
                        <span className="absolute right-1 top-0 h-full w-7 text-center text-gray-600 flex items-center justify-center">
                          <ButtonIcon
                            icon={(<IconClose />)}
                            isColorHover
                            colorHover="primary"
                            colorText="gray-600"
                            padding={1}
                            onClick={() => handleCleanSearchProduct()}
                          />
                        </span>
                      )}
                </div>
              </div>
              <div className="flex flex-col rounded-b-xl border-l border-b border-r border-blue-400 overflow-y-auto h-60">
                {Array.isArray(productsData) && productsData[0] === 'loading'
                  ? <div><IconSpiner /></div>
                  : !Array.isArray(productsData) || productsData.length === 0
                    ? <div className="flex items-center justify-center p-2 text-gray-400 italic">No se encontraron productos</div>
                    : Array.isArray(productsData) && productsData.map((item, i) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectProduct(item.id)}
                        className={`${(productsData.length - 1) !== i ? 'border-b' : 'border-b'} px-2 p-1 flex justify-between w-full hover:bg-blue-500 hover:text-white`}
                      >
                        <p className="text-sm text-left truncate ">{item.descripcion}</p>
                        <p className="text-sm text-left ml-2">{parseFloat(item.precio_sugerido).toFixed(2)}</p>
                      </button>
                    ))}
              </div>
            </div>
            <div className="flex justify-center">
              <Pagination
                page={page}
                pageRange={pageRange}
                nextPage={nextPage}
                previusPage={previusPage}
                jumpToPage={jumpToPage}
                jumpToFirstPage={jumpToFirstPage}
                jumpToLastPage={jumpToLastPage}
                lastPage={lastPage}
              />
            </div>
          </div>
        </div>
        {/* THIS DIV IS FOR BLACK BACKGROUND */}
        <div
          className="w-full h-full z-10 bg-gray-600 opacity-60"
        />
      </div>

    </>
  );
};

SearchByCategory.propTypes = {
  setIsOpenSearchByCategoryModal: PropTypes.func.isRequired,
  categoriesData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape()),
  ]).isRequired,
  productsData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setSearchCategory: PropTypes.func.isRequired,
  setSearchProduct: PropTypes.func.isRequired,
  searchProduct: PropTypes.string.isRequired,
  setLimitProduct: PropTypes.func.isRequired,
};

export default withFetch(SearchByCategory);
