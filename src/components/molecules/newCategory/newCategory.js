/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import {
  IconAlert,
  IconClose, IconDelete, IconFirst, IconLast, IconNewCategory, IconNext, IconPencil,
  IconPrev, IconSearch, IconSelect, IconSpiner,
} from '../../../assets/icons/icons';
import ButtonIcon from '../../atoms/buttons/buttonIcon';
import { useFetch } from '../../../hook';
import { errorAlert, infoAlert, successAlert } from '../../../utils/alertNotify';
import withFetch from './withFetch';
import Portal from '../../../utils/portal';
import ModalTwoOptions from '../modal/ModalTwoOptions';
import Pagination from '../../atoms/buttons/paginationButtons';

const NewCategory = ({
  setIsOpenNewCategoryModal,
  isLoadingSearchCategory,
  setIsLoadingSearchCategory,
  setCategoryId,
  setCategoryListMutate,
  handleSelectCategory,
  categoryData,
  setCategoryMutate,
  setProductMutate,
  setLimit,
  setSearchCategory,
  searchCategory,
  idCategory,
  setIdCategory,
  categoryByIdData,
  page,
  pageRange,
  nextPage,
  previusPage,
  jumpToPage,
  jumpToFirstPage,
  jumpToLastPage,
  lastPage,
}) => {
  // FORM VARIABLES
  const {
    register, watch, setValue, clearErrors, handleSubmit, setFocus, formState: { errors },
  } = useForm();

  const [openMenuFilterStatus, setOpenMenuFilterStatus] = useState(false);
  const [isLoaderSubmit, setIsLoaderSubmit] = useState(false);
  const [rowSelected, setRowSelected] = useState(null);
  const [isRowBlocked, setIsRowBlocked] = useState(false);
  const refEditPanel = useRef(null);
  const [isOpenVerifyDelete, setIsOpenVerifyDelete] = useState(false);
  const [isDeleteLoad, setIsDeleteLoad] = useState(false);
  const [idToDelete, setIdToDelete] = useState(-1);

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [isEditModeActive, setIsEditModeActive] = useState(false);
  const refCategory = useRef();

  const fetchCategory = useFetch('category');

  // CLEAN search
  const handleCleanSearchCategory = () => {
    setSearchCategory('');
    refCategory.current.value = '';
    refCategory.current.focus();
  };

  // WRITTING word to search
  const handleChangeCategory = (event) => {
    // debugger;
    const { value } = event.target;
    // VERIFY IF KEYWORD WITH "/" or "\" AND START/END SPACES
    let search = value.split('/').join(' ');
    search = search.split('\\').join(' ');
    search = search.trim();
    setSearchCategory(search);
  };

  // <--------- CANT ROWS FUNCTIONS --------->
  const handleChangeCantView = (e) => {
    const { value } = e.target;
    setLimit(value);
  };

  // SELECT ADMIN TO EDIT
  const handleEditCategory = (id) => {
    setIdCategory(id);
    setFocus('description');
    setIsRowBlocked(true);
    setRowSelected(id);
    setIsEditModeActive(true);
    clearErrors();
  };

  // INSERT DATA IN REACT HOOK FORM
  useEffect(() => {
    if (isEditModeActive) {
      setValue('description', categoryByIdData.descripcion);
      clearErrors();
    }
  }, [categoryByIdData]);

  // LIMPIAR EDIT PANEL
  const clearInputs = () => {
    setIdCategory(-1);
    setValue('description', '');
    clearErrors();
  };

  // CANCEL EDIT PANEL
  const handleCancel = () => {
    setIdCategory(-1);
    setIsRowBlocked(false);
    setIsEditModeActive(false);
    clearInputs();
  };

  // CREATE ADMIN
  const createCategory = async (data) => {
    setIsLoaderSubmit(true);
    try {
      const [result, status] = await fetchCategory.post({ descripcion: data.description });
      if (status !== 200) {
        setCategoryId(0);
        handleSelectCategory(0);
        errorAlert(result.message);
        setIsLoaderSubmit(false);
      } else {
        successAlert('Guardado Correctamente');
        setCategoryId(result.result.id);
        setIsOpenNewCategoryModal(false);
        handleSelectCategory(result.result.id);
        // await adminMutate();
        setIsLoaderSubmit(false);
        // await productByIdMutate();
        clearInputs();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCategoryMutate(Date.now());
      setProductMutate(Date.now());
    }
    // }
    //   else {
    //   setIsLoaderSubmit(false);
    // }
  };

  const handleCleanEdit = () => {
    setIdCategory(-1);
    setValue('description', '');
    setIsRowBlocked(false);
    clearInputs();
  };

  // EDIT ADMIN
  const editCategory = async (data) => {
    // console.log('editando');
    setIsLoaderSubmit(true);
    const dataToAdd = {
      description: data.description,
    };
    try {
      const [result, status] = await fetchCategory.put(idCategory, dataToAdd);
      if (status !== 200) {
        errorAlert('Seleccionar categoria para Editar');
        setIsLoaderSubmit(false);
      } else {
        // await adminMutate();
        setIsLoaderSubmit(false);
        // await productByIdMutate();
        // setIsEditModeActive(true);
        setIsRowBlocked(false);
        clearInputs();
        successAlert('Categoria Actualizada Correctamente');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCategoryMutate(Date.now());
      setProductMutate(Date.now());
      // setCategoryListMutate(Date.now());
      setIsEditModeActive(true);
    }
  };

  // SUBMIT CREATE AND EDIT
  const onSubmit = async (data) => {
    if (!isEditModeActive) {
      await createCategory(data);
    } else if (isEditModeActive) {
      await editCategory(data);
    }
  };

  // DELETE ADMIN
  const handleDeleteCategory = async () => {
    setIsDeleteLoad(true);
    const id = idToDelete;
    try {
      const [result, status] = await fetchCategory.del(id);
      if (status !== 200) {
        errorAlert(result.message || 'Algo salió mal, intentelo nuevamente');
      } else {
        // await adminMutate();
        // await productByIdMutate();
        infoAlert('Eliminado Correctamente');
      }
    } catch (error) {
      errorAlert('Algo salió mal, intentelo nuevamente');
    } finally {
      setCategoryMutate(Date.now());
      // setCategoryListMutate(Date.now());
      setIsEditModeActive(true);
    }
    if (idCategory === id) {
      handleCleanEdit();
    }
    setIsDeleteLoad(false);
    setIsOpenVerifyDelete(false);
    setIdToDelete(-1);
  };

  return (
    <>
      {isOpenVerifyDelete
        && (
          <Portal>
            <ModalTwoOptions
              titleModal={(
                <>
                  <div className="-mt-2 flex justify-center items-center text-center text-yellow-500 w-20"><IconAlert /></div>
                  <p className="-mt-2">¿Esta seguro de Eliminar</p>
                  <p>la Categoria:</p>
                  <p className="pb-2">{`${categoryData?.filter((item) => item.id === idToDelete)[0]?.descripcion}?`}</p>
                </>
              )}
              titleFirstOption="   Cancelar   " // SPACES with alt + 0160
              titleSecondOption=" Eliminar "
              onClickFirstOption={() => { setIsOpenVerifyDelete(false); setIsDeleteLoad(false); }}
              onClickSecondOption={() => handleDeleteCategory()}
              isLoadSecondOption={isDeleteLoad}
              colorFirstButton="red-500"
            />
          </Portal>
        )}
      <div className="flex items-center justify-center w-full h-full z-50 fixed">
        <div className="flex p-4 pt-6 mt-2 flex-col justify-center absolute z-20 bg-white rounded-xl
      w-11/12 sm:w-5/6 md:w-3/4 lg:w-1/2 xl:w-2/5 max-h-screen"
        >

          <button
            type="button"
            onClick={() => {
              setCategoryListMutate(Date.now()); setIsOpenNewCategoryModal(false);
            }}
            className="absolute right-5 top-3 text-gray-600 hover:text-gray-800 z-40"
          >
            <IconClose />
          </button>
          <div className="flex items-center ml-2.5 mb-2.5">
            <p className="text-xl text-gray-700 font-semibold mb-1 mr-3.5">{`${!isEditModeActive ? 'Nueva' : 'Editar'} Categoria`}</p>
            <button type="button" onClick={() => (isEditModeActive ? handleCancel() : setIsEditModeActive(true))} className="flex items-center pl-2.5 pr-4 rounded-full text-white bg-primary opacity-90 hover:opacity-100">
              {!isEditModeActive ? <span className="w-4 mr-1"><IconPencil autosize /></span> : <span className="w-4 mr-1"><IconNewCategory autosize /></span>}
              <p className="pb-0.5">{`${!isEditModeActive ? 'Edición' : 'Crear'}`}</p>
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex z-10 text-sm">
              <p className="font-semibold text-gray-700 ml-2 pl-1 sm:font-semibold ">Nombre de Categoria</p>
            </div>
            <label htmlFor="description" className="w-full relative mb-2 flex flex-col justify-center ">
              <input
                placeholder="Ingresar Nombre de la Categoria"
                type="text"
                className={`${errors?.description ? 'ring-red-500' : 'ring-blue-400'} bg-white pl-3 pr-3 py-1 text-sm rounded-xl w-full ring-1 focus:ring-2 focus:outline-none text-gray-800`}
                {
                ...register(
                  'description',
                  {
                    required: {
                      value: true,
                      message: 'Ingresar nombre de categoria',
                    },
                  },
                )
                }
              />
            </label>
            <span className={`${errors?.description ? '' : 'hidden'} pl-2 text-xs text-red-500 mb-0.5 -mt-1.5`}>
              {errors?.description?.message}
            </span>

            {/* BUTTONS FINALY */}
            <div className="flex space-x-9 mt-4">
              <button
                type="button"
                onClick={() => (isEditModeActive
                  ? handleCleanEdit()
                  : () => { setCategoryListMutate(Date.now()); setIsOpenNewCategoryModal(false); })}
                className="border-2 border-red-600 bg-red-500 hover:bg-red-600 hover:ring ring-gray-300 pt-0.5 pb-1 rounded-xl w-full focus:outline-none text-white"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="border-2 border-primary bg-primary bg-opacity-90 hover:bg-opacity-100 hover:ring ring-gray-300 pt-0.5 pb-1 rounded-xl w-full focus:outline-none text-white"
              >
                Guardar
              </button>
            </div>
          </form>
          {isEditModeActive
            && (
              <div className="flex flex-col justify-center mt-3">
                <p className="font-semibold text-gray-600 ml-3 mb-1 sm:font-semibold text-left">Lista de Categorias</p>
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
                        ref={refCategory}
                        className="pl-3 pr-8 p-1 w-full bg-white rounded-xl appearance-none focus:outline-none border border-gray-300 focus:border-blue-400"
                        type="text"
                        placeholder="Buscar"
                        onChange={(e) => {
                          setIsLoadingSearchCategory(true);
                          setTimeout(() => {
                            handleChangeCategory(e);
                          }, 1000);
                        }}
                      />
                      {searchCategory === ''
                        ? isLoadingSearchCategory
                          ? (
                            <span className="absolute right-1 top-0 h-full w-7 text-center text-gray-600 flex items-center justify-center">
                              <IconSpiner dark mini />
                            </span>
                          )
                          : (
                            <span className="absolute right-1 top-0 h-full w-7 text-center text-gray-600 flex items-center justify-center">
                              <IconSearch />
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
                              onClick={() => handleCleanSearchCategory()}
                            />
                          </span>
                        )}
                    </div>
                  </div>
                  {/* <--TABLE DATA--> */}
                  <div className="flex flex-col rounded-b-xl border-l border-b border-r border-blue-400 overflow-y-auto h-64">
                    <div className="pl-2.5 pr-3 pt-2.5 p-4 overflow-auto max-h-96">
                      <table id="tableAdmin" className="table-fixed text-center text-gray-700 w-full">
                        <thead>
                          <tr className="border-l border-gray-400 bg-red-500 opacity-90 text-white">
                            <th className="border-r border-b border-gray-200 px-6 py-2 font-medium whitespace-nowrap w-full">Nombre de Categoria</th>
                            <th className="border-b border-gray-200 px-2 py-2 font-medium w-20">Editar</th>
                            <th className="border-l border-gray-400 bg-white select-none">0</th>
                          </tr>
                        </thead>
                        {Array.isArray(categoryData) && categoryData[0] !== 'loading'
                          && (
                            <tbody>
                              {categoryData.map((item) => (
                                <tr key={item.id} onClick={() => !isRowBlocked && setRowSelected(item.id)} className={`text-sm rowTable ${rowSelected === item.id && 'rowTableAdminSelected'}`}>
                                  <td className="border border-gray-350 px-2 py-2 font-medium capitalize text-left">{item.descripcion || ''}</td>
                                  <td className="border border-gray-350 px-2 py-2 font-medium">
                                    <div className="flex justify-center space-x-2">
                                      <ButtonIcon
                                        icon={<IconPencil />}
                                        isBorder
                                        isBgColor
                                        colorBg="primary"
                                        onClick={() => {
                                          handleEditCategory(item.id);
                                        }}
                                        padding={1}
                                      />
                                      <ButtonIcon
                                        icon={<IconDelete />}
                                        isBorder
                                        isBgColor
                                        colorBg="red-500"
                                        onClick={() => {
                                          setIsOpenVerifyDelete(true);
                                          setIdToDelete(item.id);
                                        }}
                                        padding={1}
                                      />
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          )}
                      </table>
                      <div>
                        {/* LOADING is here beacuse the loader have to be out of the table */}
                        {categoryData[0] === 'loading'
                          ? (
                            <div className="flex items-center justify-center py-8">
                              <IconSpiner dark medium />
                            </div>
                          )
                          : categoryData.length === 0 || !Array.isArray(categoryData)
                            ? (
                              <div className="flex items-center justify-center py-8 italic text-gray-700">
                                No se Encontraron Resultados
                              </div>
                            ) : ''}
                      </div>
                    </div>
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
            )}

        </div>
        {/* THIS DIV IS FOR BLACK BACKGROUND */}
        <div
          className="w-full h-full z-10 bg-gray-600 opacity-60"
        />
      </div>

    </>
  );
};

NewCategory.propTypes = {
  setIsOpenNewCategoryModal: PropTypes.func.isRequired,
  isLoadingSearchCategory: PropTypes.bool.isRequired,
  setIsLoadingSearchCategory: PropTypes.func.isRequired,
  setCategoryId: PropTypes.func.isRequired,
  handleSelectCategory: PropTypes.func.isRequired,
  pageActual: PropTypes.number.isRequired,
  setPageActual: PropTypes.func.isRequired,
  categoryData: PropTypes.shape().isRequired,
  setCategoryMutate: PropTypes.func.isRequired,
  pages: PropTypes.number.isRequired,
  setLimit: PropTypes.func.isRequired,
  setSearchCategory: PropTypes.func.isRequired,
  searchCategory: PropTypes.string.isRequired,
  idCategory: PropTypes.number.isRequired,
  setIdCategory: PropTypes.func.isRequired,
  categoryByIdData: PropTypes.shape().isRequired,
};

export default withFetch(NewCategory);
