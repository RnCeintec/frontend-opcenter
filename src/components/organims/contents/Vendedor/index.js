/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import {
  IconAdminSolid, IconPrev, IconNext, IconFirst, IconLast, IconSelect, IconSearch,
  IconSpiner, IconDelete, IconPencil, IconKey, IconImage, IconUser, IconUserCircle,
  IconRefresh, IconUpload, IconClose, IconAlert, IconProduct, IconProductCode, IconCategory, IconFilter, IconStock, IconNewClient, IconNewCategory, IconUsersSolid, IconIdCard, IconGPS, IconPhone, IconObservation,
} from '../../../../assets/icons/icons';
import ButtonIcon from '../../../atoms/buttons/buttonIcon';
import withFetch from './withFetch';
import {
  errorAlert, infoAlert, successAlert, warningAlert,
} from '../../../../utils/alertNotify';
import useFetch from '../../../../hook/usefetch';
import ModalTwoOptions from '../../../molecules/modal/ModalTwoOptions';
import Portal from '../../../../utils/portal';
import NewCategory from '../../../molecules/newCategory/newCategory';
import { scrollTo, scrollUp } from '../../../../utils/scrolling';
import Pagination from '../../../atoms/buttons/paginationButtons';
import FormTextInput from '../../../atoms/formInputs/formTextInput';
import FormSelectInput from '../../../atoms/formInputs/formSelectInput';

const Vendedor = ({
  isLoadingSearchVendedor,
  setIsLoadingSearchVendedor,
  categoryId,
  setCategoryId,
  setCategoryListMutate,
  pageActual,
  setPageActual,
  vendedorData,
  setVendedorMutate,
  categoriesData,
  pages,
  setLimit,
  setSearchVendedor,
  searchVendedor,
  setIdVendedor,
  idVendedor,
  vendedorByIdData,
  setFilterStatus,
  filterStatus,
  page,
  pageRange,
  lastPage,
  nextPage,
  previusPage,
  jumpToPage,
  jumpToFirstPage,
  jumpToLastPage,
}) => {
  // filter
  const [openMenuFilterStatus, setOpenMenuFilterStatus] = useState(false);
  const [isLoadingSelectItem, setIsLoadingSelectItem] = useState(false);
  const [isLoaderSubmit, setIsLoaderSubmit] = useState(false);
  const [rowSelected, setRowSelected] = useState(null);
  const [isRowBlocked, setIsRowBlocked] = useState(false);
  const [typeOfPanel, setTypeOfPanel] = useState('Ingresar');
  const refEditPanel = useRef(null);
  const [isOpenVerifyDelete, setIsOpenVerifyDelete] = useState(false);
  const [isDeleteLoad, setIsDeleteLoad] = useState(false);
  const [idToDelete, setIdToDelete] = useState(-1);
  const refSearch = useRef(null);

  const fetchVendedor = useFetch('vendedor');
  // const fetchUploadImg = useFetch('');

  // FORM VARIABLES
  const {
    register, watch, reset, setValue, clearErrors, handleSubmit, setFocus, formState: { errors },
  } = useForm();

  // <------------- FILTER status ----------->
  // OPEN menu filter by status
  // const handleFilterStatus = () => {
  //   setOpenMenuFilterStatus(!openMenuFilterStatus);
  // };
  // const onChangeFilterStatus = (e) => {
  //   const { checked, value } = e.target;

  //   if (filterStatus === 'Filtrar Estado') {
  //     if (checked) {
  //       setFilterStatus(value);
  //     }
  //   } else if (checked) {
  //     setFilterStatus(`${filterStatus},${value}`);
  //   } else {
  //     let newValue = filterStatus.split(`,${value}`).join('');
  //     newValue = newValue.split(`${value},`).join('');
  //     newValue = newValue.split(value).join('');
  //     if (newValue === '') {
  //       setFilterStatus('Filtrar Estado');
  //     } else { setFilterStatus(newValue); }
  //   }
  // };

  // <--- FUNCTIONS TO SEARCH ---> 🔎

  // WRITTING word to search
  const handleChangeSearch = (event) => {
    const { value } = event.target;
    // VERIFY IF KEYWORD WITH "/" or "\" AND START/END SPACES
    let search = value.split('/').join(' ');
    search = search.split('\\').join(' ');
    search = search.trim();
    setSearchVendedor(search);
  };

  // CLEAN search
  const handleCleanSearch = () => {
    setSearchVendedor('');
    refSearch.current.value = '';
    refSearch.current.focus();
  };

  // <--------- CANT ROWS FUNCTIONS --------->
  const handleChangeCantView = (e) => {
    const { value } = e.target;
    setLimit(value);
  };

  // <--------- EDIT AND CREATE ADMIN ---------> ✍
  // SELECT ADMIN TO EDIT
  const handleEditVendedor = (id) => {
    setIdVendedor(id);
    setIsRowBlocked(true);
    setRowSelected(id);
    setTypeOfPanel('Editar');
    clearErrors();
    scrollTo(refEditPanel);
    if (idVendedor !== id) {
      setIsLoadingSelectItem(true);
    }
    if (idVendedor === id) {
      setFocus('documento');
    }
  };

  // INSERT DATA IN REACT HOOK FORM
  useEffect(() => {
    if (typeOfPanel === 'Editar') {
      setValue('tipo_documento', vendedorByIdData.tipo_documento || 'dni');
      setValue('documento', vendedorByIdData.documento || '');
      setValue('nombres', vendedorByIdData.nombres || '');
      setValue('direccion', vendedorByIdData.direccion || '');
      setValue('telefono', vendedorByIdData.telefono || '');
      clearErrors();
      if (vendedorByIdData.tipo_documento) {
        setIsLoadingSelectItem(false);
        // setFocus('NumDocu');
      }
    }
  }, [vendedorByIdData]);

  // LIMPIAR EDIT PANEL
  const clearInputs = () => {
    setIdVendedor(-1);
    setValue('tipo_documento', 'dni');
    setValue('documento', '');
    setValue('nombres', '');
    setValue('direccion', '');
    setValue('telefono', '');
    clearErrors();
  };

  // CANCEL EDIT PANEL
  const handleCancel = () => {
    setIdVendedor(-1);
    setIsRowBlocked(false);
    setTypeOfPanel('Ingresar');
    clearInputs();
  };

  // CREATE ADMIN
  const createVendedor = async (data) => {
    setIsLoaderSubmit(true);
    const dataToAdd = {
      nombres: data.nombres,
      tipo_documento: data.tipo_documento,
      documento: data.documento,
      direccion: data.direccion,
      telefono: data.telefono,
    };
    const [result, status] = await fetchVendedor.post(dataToAdd);
    if (status !== 200) {
      errorAlert(result.message);
      setIsLoaderSubmit(false);
    } else {
      // await adminMutate();
      setIsLoaderSubmit(false);
      // await clientByIdMutate();
      clearInputs();
      successAlert('Vendedor Creado Correctamente');
    }
    // }
    //   else {
    //   setIsLoaderSubmit(false);
    // }
    await setVendedorMutate(Date.now());
  };

  // EDIT ADMIN
  const editVendedor = async (data) => {
    // console.log('editando');
    setIsLoaderSubmit(true);
    const dataToAdd = {
      nombres: data.nombres,
      tipo_documento: data.tipo_documento,
      documento: data.documento,
      direccion: data.direccion,
      telefono: data.telefono,
    };
    try {
      const [result, status] = await fetchVendedor.put(idVendedor, dataToAdd);
      if (status !== 200) {
        errorAlert(result.message);
        setIsLoaderSubmit(false);
      } else {
        // await adminMutate();
        await setIsLoaderSubmit(false);
        // await clientByIdMutate();
        setTypeOfPanel('Ingresar');
        setIsRowBlocked(false);
        clearInputs();
        successAlert('Vendedor Actualizado Correctamente');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setVendedorMutate(Date.now);
      scrollUp();
    }
  };

  // SUBMIT CREATE AND EDIT
  const onSubmit = async (data) => {
    if (typeOfPanel === 'Ingresar') {
      await createVendedor(data);
    } else if (typeOfPanel === 'Editar') {
      await editVendedor(data);
    }
  };

  // DELETE ADMIN
  const handleDeleteClient = async () => {
    setIsDeleteLoad(true);
    const id = idToDelete;
    try {
      const [result, status] = await fetchVendedor.del(id);
      if (status !== 200) {
        errorAlert(result.message || 'Algo salió mal, intentelo nuevamente');
      } else {
        // await adminMutate();
        // await clientByIdMutate();
        infoAlert('Eliminado Correctamente');
      }
    } catch (error) {
      errorAlert('Algo salió mal, intentelo nuevamente');
    } finally {
      await setVendedorMutate(Date.now());
    }
    if (idVendedor === id) {
      handleCancel();
    }
    setIsDeleteLoad(false);
    setIsOpenVerifyDelete(false);
    setIdToDelete(-1);
  };

  // <--------- REFRESH FUNCTION ---------> 🔄
  const handleRefresh = async () => {
    // await adminMutate();
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
                  <p>el Vendedor:</p>
                  <p className="pb-2">{`${vendedorData?.filter((item) => item.id === idToDelete)[0]?.nombres}?`}</p>
                </>
              )}
              titleFirstOption="   Cancelar   " // SPACES with alt + 0160
              titleSecondOption=" Eliminar "
              onClickFirstOption={() => { setIsOpenVerifyDelete(false); setIsDeleteLoad(false); }}
              onClickSecondOption={() => handleDeleteClient()}
              isLoadSecondOption={isDeleteLoad}
              colorFirstButton="red-500"
            />
          </Portal>
        )}
      <div className="flex flex-col items-center bg-bg-blue w-full min-h-screen box-border">
        <div className="pl-4 pt-2 flex w-full h-12 sm:h-16 bg-white shadow-sm">
          <div className="flex text-2xl sm:text-4xl text-gray-800 font-semibold">
            Vendedores
            <div className="text-primary opacity-80 w-7 sm:w-10 ml-1">
              <IconUsersSolid autosize />
            </div>
          </div>

        </div>
        <div className="flex flex-col items-start md:flex-row w-full h-full p-4 box-border">
          <div className="flex flex-col sm:flex-row mb-4 md:mb-0 w-full md:w-2/3">
            <div className="w-full bg-white rounded-xl shadow sm:mb-0">
              <div className="flex flex-col sm:flex-row justify-between border-b w-full text-gray-800 font-semibold px-4 p-2">
                <div className="flex">
                  <div className="flex relative w-1/3 sm:w-20 mr-3">
                    <select
                      onChange={(e) => handleChangeCantView(e)}
                      className="rounded-xl border appearance-none bg-white border-gray-300 py-1 w-full focus:outline-none focus:border-primary text-base pl-3 pr-4"
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

                  {/* FILTER STATUS */}
                  {/* <div className="relative w-1/2 sm:w-40 mr-3">
                    <button
                      type="button"
                      onClick={handleFilterStatus}
                      className={`text-left ${openMenuFilterStatus ? 'rounded-t-xl' : 'rounded-xl'}  border bg-white border-gray-300 py-1 w-full focus:outline-none focus:border-primary text-base pl-2 pr-7`}
                    >
                      <div className={`whitespace-nowrap overflow-hidden ${filterStatus.length > 15 ? 'text-xs py-1' : ''}`}>
                        {filterStatus}
                      </div>
                    </button>
                    <span className="absolute right-0 top-0 h-full w-7 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <IconFilter />
                    </span>
                    <form className={`${openMenuFilterStatus ? 'flex' : 'hidden'} flex-col absolute bg-white border-r border-b border-l border-gray-300 w-full rounded-b-md p-2 z-10`}>
                      {/* {saleStatus.map((item) => (
                        <label key={item.name} htmlFor={item.name} className="flex items-center ">
                          <input type="checkbox" checked={filterStatus.split(',').includes(item.name)} value={item.name} id={item.name} onChange={(e) => onChangeFilterStatus(e)} className="checked:bg-blue-600 checked-border-transparent mr-1" />
                          <p>{item.name}</p>
                        </label>
                      ))} */}
                  {/* <label htmlFor="Cocina" className="flex items-center ">
                        <input type="checkbox" checked value="Cocina" id="Cocina" onChange={(e) => onChangeFilterStatus(e)} className="checked:bg-blue-600 checked-border-transparent mr-1" />
                        <p>Cocina</p>
                      </label>
                      <label htmlFor="Baño" className="flex items-center ">
                        <input type="checkbox" checked value="Baño" id="Baño" onChange={(e) => onChangeFilterStatus(e)} className="checked:bg-blue-600 checked-border-transparent mr-1" />
                        <p>Baño</p>
                      </label>
                      <label htmlFor="Sala" className="flex items-center ">
                        <input type="checkbox" checked value="Sala" id="Sala" onChange={(e) => onChangeFilterStatus(e)} className="checked:bg-blue-600 checked-border-transparent mr-1" />
                        <p>Sala</p>
                      </label>
                    </form>
                  </div>  */}

                  <div
                    className="flex flex-row justify-end w-full sm:w-auto relative"
                  >
                    <input
                      ref={refSearch}
                      className="pl-3 pr-8 p-1 w-full bg-white rounded-xl appearance-none focus:outline-none border border-gray-300 focus:border-primary"
                      type="text"
                      placeholder="Buscar"
                      onChange={(e) => {
                        setIsLoadingSearchVendedor(true);
                        setTimeout(() => {
                          handleChangeSearch(e);
                        }, 1000);
                      }}
                    />
                    {searchVendedor === ''
                      ? (
                        <span className="absolute right-1 top-0 h-full w-7 text-center text-gray-600 flex items-center justify-center">
                          <IconSearch />
                        </span>
                      )
                      : isLoadingSearchVendedor
                        ? (
                          <span className="absolute right-1 top-0 h-full w-7 text-center text-gray-600 flex items-center justify-center">
                            <IconSpiner dark mini />
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
                              onClick={() => handleCleanSearch()}
                            />
                          </span>
                        )}
                  </div>
                </div>
              </div>

              {/* <--TABLE DATA--> */}
              <div className="p-4 overflow-auto max-h-96">
                <table id="tableAdmin" className="table-auto text-center text-gray-700 w-full">
                  <thead>
                    <tr className="border-l border-gray-400 bg-primary opacity-90 text-white">
                      {/* <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">Documento</th>
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium text-sm">N° Documento</th> */}
                      <th className="border-r border-b border-gray-200 px-6 py-2 font-medium whitespace-nowrap">Vendedor</th>
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">Documento</th>
                      {/* <th className="border-r border-b border-gray-200 px-12 py-2 font-medium">Dirección</th> */}
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">Telefono</th>
                      <th className="border-b border-gray-200 px-2 py-2 font-medium">Editar</th>
                      <th className="border-l border-gray-400 bg-white select-none">0</th>
                    </tr>
                  </thead>
                  {Array.isArray(vendedorData) && vendedorData[0] !== 'loading'
                    && (
                      <tbody>
                        {vendedorData.map((item) => (
                          <tr key={item.id} onClick={() => !isRowBlocked && setRowSelected(item.id)} className={`text-sm rowTable ${rowSelected === item.id && 'rowTableAdminSelected'}`}>
                            {/* <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{(item.tipo_documento === 'dni' ? 'DNI' : item.tipo_documento === 'ruc' ? 'RUC' : item.tipo_documento) || ''}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium">{item.NumDocu || ''}</td> */}
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize text-left">{item.nombres || ''}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.documento || ''}</td>
                            {/* <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.Direccion || ''}</td> */}
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.telefono || ''}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium">
                              <div className="flex justify-center space-x-2">
                                <ButtonIcon
                                  icon={<IconPencil />}
                                  isBorder
                                  isBgColor
                                  colorBg="primary"
                                  onClick={() => {
                                    handleEditVendedor(item.id);
                                  }}
                                  padding={1}
                                />
                                {item.id !== 1
                                  && (
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
                                  )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                </table>
                <div>
                  {/* LOADING is here beacuse the loader have to be out of the table */}
                  {vendedorData[0] === 'loading'
                    ? (
                      <div className="flex items-center justify-center py-8">
                        <IconSpiner dark medium />
                      </div>
                    )
                    : vendedorData.length === 0 || !Array.isArray(vendedorData)
                      ? (
                        <div className="flex items-center justify-center py-8 italic text-gray-700">
                          No se Encontraron Resultados
                        </div>
                      ) : ''}
                </div>
              </div>
              <div className="border-t text-gray-800 font-semibold pl-4 p-2 select-none relative">
                {/* <div className="flex absolute -mt-0.5 -ml-2.5 sm:-ml-0 justify-between sm:justify-start">
                  <ButtonIcon
                    icon={<IconRefresh />}
                    colorText="primary"
                    isColorHover
                    colorHover="blue-500"
                    onClick={() => handleRefresh()}
                  />
                </div> */}
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
          </div>

          {/* <-- PANEL TO EDIT Admin --> */}
          <div className=" w-full md:w-1/3 md:pl-4">
            <div ref={refEditPanel} className=" bg-white rounded-xl shadow">
              <div className="text-green-600 border-b border-gray-300 rounded-t font-bold pl-4 p-2">
                {typeOfPanel}
                {' '}
                Vendedor
              </div>
              <div className="flex flex-col w-full pt-3 p-4">

                {isLoaderSubmit ? (
                  <div className="flex flex-col items-center w-full h-full">
                    <IconSpiner dark big />
                    Guardando...
                  </div>
                )
                  : (
                    <>
                      <form className="flex flex-col w-full -mt-2 relative" onSubmit={handleSubmit(onSubmit)}>
                        <FormSelectInput inputName="tipo_documento"
                          title="Documento"
                          icon={<IconIdCard />}
                          options={{
                            validate: {
                              select: (e) => e !== 'select' || 'Campo Obligatorio',
                            },
                          }}
                          register={register} watch={watch} errors={errors}
                        >
                          <option value="dni" className="text-gray-700">DNI</option>
                          {/* <option value="ruc" className="text-gray-700">RUC</option> */}
                          <option value="carnet" className="text-gray-700">Carnet Extr.</option>
                        </FormSelectInput>
                        <FormTextInput inputName="documento"
                          title="N° Documento"
                          icon={<IconIdCard />}
                          placeholder="Ingrese N° Documento"
                          options={{
                            validate: {
                              empty: (v) => v !== '' || 'Colocar Número de Documento',
                              dni: (v) => (watch('tipo_documento') === 'dni' ? v.length === 8 : true) || 'DNI debe tener 8 Digitos',
                              /* ruc: (v) => (watch('tipo_documento') === 'ruc' ? v.length === 11 : true) || 'RUC debe tener 11 Digitos', */
                              carnet: (v) => (watch('tipo_documento') === 'carnet' ? v.length === 9 : true) || 'Carnet debe tener 9 Digitos',
                            },
                            pattern: {
                              value: /^[0-9]+$/,
                              message: 'Número de Documento invalido',
                            },
                          }}
                          type="number"
                          register={register} errors={errors}
                        />
                        <FormTextInput inputName="nombres"
                          title="Nombres"
                          icon={<IconUserCircle />}
                          placeholder={`Ingresar ${watch('tipo_documento') === 'ruc' ? 'Razón Social' : 'Nombre del Vendedor'}`}
                          options={{
                            required: {
                              value: true,
                              message: 'Nombre requerido',
                            },
                            pattern: {
                              value: /^[a-zA-Z áéíóúüÁÉÍÓÚñÑ]+$/,
                              message: 'Nombre invalido',
                            },
                          }}
                          register={register} errors={errors}
                        />
                        
                        {/* <FormTextInput inputName="Apellidos"
                          title="Dirección"
                          icon={<IconGPS />}
                          placeholder="Ingresar Direccion"
                          options={{
                            required: {
                              value: true,
                              message: 'Dirección del Cliente Requerido',
                            },
                          }}
                          register={register} errors={errors}
                        /> */}
                        <FormTextInput inputName="telefono"
                          title="Teléfono"
                          icon={<IconPhone />}
                          type="money"
                          placeholder="Ingresar N° Telefono (opcional)"
                          options={{
                            pattern: {
                              value: /^[0-9]+$/,
                              message: 'Teléfono invalido',
                            },
                            validate: {
                              length: (e) => (e !== '' ? e.length === 9 : true) || 'Debe tener 9 digitos',
                            },
                          }}
                          register={register} errors={errors}
                        />
                        <FormTextInput inputName="direccion"
                          title="Dirección"
                          icon={<IconObservation />}
                          placeholder="Ingresar Dirección (opcional)"
                          register={register} errors={errors}
                        />

                        <div className="flex justify-end space-x-5  mt-3 sm:mt-4">
                          <button
                            className="flex items-center justify-center p-1.5 text-white text-sm sm:text-base bg-red-500 hover:bg-red-600 opacity-90 hover:opacity-100 rounded-xl w-24 sm:w-40 cursor-pointer focus:outline-none"
                            type="button"
                            onClick={() => handleCancel()}
                          >
                            <div className="">Cancelar</div>
                          </button>
                          <button
                            className="flex items-center justify-center p-1.5 text-white text-sm sm:text-base bg-primary hover:bg-primary opacity-90 hover:opacity-100 rounded-xl w-24 sm:w-40 cursor-pointer focus:outline-none"
                            type="submit"
                            onClick={() => handleSubmit()}
                          >
                            <div className="">
                              {typeOfPanel === 'Ingresar' ? 'Ingresar' : 'Actualizar'}
                            </div>
                          </button>
                        </div>
                        {isLoadingSelectItem
                          && (
                            <div className="flex items-center justify-center absolute top-0 bg-white bg-opacity-50 h-full w-full">
                              <IconSpiner dark medium />
                            </div>
                          )}
                      </form>
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Vendedor.propTypes = {
  isLoadingSearchVendedor: PropTypes.bool.isRequired,
  setIsLoadingSearchVendedor: PropTypes.func.isRequired,
  setCategoryListMutate: PropTypes.func.isRequired,
  categoryId: PropTypes.number.isRequired,
  setCategoryId: PropTypes.func.isRequired,
  pageActual: PropTypes.number.isRequired,
  setPageActual: PropTypes.func.isRequired,
  vendedorData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape()),
  ]).isRequired,
  setVendedorMutate: PropTypes.func.isRequired,
  categoriesData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape()),
  ]).isRequired,
  pages: PropTypes.number.isRequired,
  setLimit: PropTypes.func.isRequired,
  setSearchVendedor: PropTypes.func.isRequired,
  searchVendedor: PropTypes.string.isRequired,
  idVendedor: PropTypes.number.isRequired,
  setIdVendedor: PropTypes.func.isRequired,
  vendedorByIdData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape()),
  ]).isRequired,
  filterStatus: PropTypes.string.isRequired,
  setFilterStatus: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  lastPage: PropTypes.number.isRequired,
  nextPage: PropTypes.func.isRequired,
  previusPage: PropTypes.func.isRequired,
  jumpToPage: PropTypes.func.isRequired,
  jumpToFirstPage: PropTypes.func.isRequired,
  jumpToLastPage: PropTypes.func.isRequired,
};

export default withFetch(Vendedor);
