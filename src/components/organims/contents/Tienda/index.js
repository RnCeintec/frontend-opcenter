import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import {
  IconSelect, IconSearch,
  IconSpiner, IconDelete, IconPencil,
  IconRefresh, IconClose, IconAlert, IconLocal, IconProductCode, IconCategory, IconStock, IconNewCategory, 
  IconUsersSolid, IconIdCard, IconGPS, IconPhone, IconObservation, IconEmail
        } from '../../../../assets/icons/icons';
import ButtonIcon from '../../../atoms/buttons/buttonIcon';
import withFetch from './withFetch';
import {
  errorAlert, infoAlert, successAlert, warningAlert,
        } from '../../../../utils/alertNotify';
import useFetch from '../../../../hook/usefetch';
import ModalTwoOptions from '../../../molecules/modal/ModalTwoOptions';
import Portal from '../../../../utils/portal';
/* import NewCategory from '../../../molecules/newCategory/newCategory'; */
import { scrollTo, scrollUp } from '../../../../utils/scrolling';
import Pagination from '../../../atoms/buttons/paginationButtons';
import FormTextInput from '../../../atoms/formInputs/formTextInput';
import FormSelectInput from '../../../atoms/formInputs/formSelectInput';

const Local = ({
    isLoadingSearchLocal,
    setIsLoadingSearchLocal,
    localData,
    setLocalMutate,
    setLimit,
    setSearchLocal,
    searchShop,
    setIdLocal,
    idLocal,
    localByIdData,
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
  
    const fetchLocal = useFetch('local');
      
    // FORM VARIABLES
    const {
      register, watch, reset, setValue, clearErrors, handleSubmit, setFocus, formState: { errors },
    } = useForm();
  
    // OPEN menu filter by status
    const handleFilterStatus = () => {
      setOpenMenuFilterStatus(!openMenuFilterStatus);
    };
    // FILTER status
    const onChangeFilterStatus = (e) => {
      const { checked, value } = e.target;
  
      if (filterStatus === 'Filtrar Estado') {
        if (checked) {
          setFilterStatus(value);
        }
      } else if (checked) {
        setFilterStatus(`${filterStatus},${value}`);
      } else {
        let newValue = filterStatus.split(`,${value}`).join('');
        newValue = newValue.split(`${value},`).join('');
        newValue = newValue.split(value).join('');
        if (newValue === '') {
          setFilterStatus('Filtrar Estado');
        } else { setFilterStatus(newValue); }
      }
    };
  // <--- FUNCTIONS TO SEARCH ---> 🔎

  // WRITTING word to search
  const handleChangeSearch = (event) => {
    const { value } = event.target;
    // VERIFY IF KEYWORD WITH "/" or "\" AND START/END SPACES
    let search = value.split('/').join(' ');
    search = search.split('\\').join(' ');
    search = search.trim();
    setSearchLocal(search);
  };

  // CLEAN search
  const handleCleanSearch = () => {
    setSearchLocal('');
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
  const handleEditLocal = (id) => {
    setIdLocal(id);
    setIsRowBlocked(true);
    setRowSelected(id);
    setTypeOfPanel('Editar');
    clearErrors();
    scrollTo(refEditPanel);
    if (idLocal !== id) {
      setIsLoadingSelectItem(true);
    }
    if (idLocal === id) {
      setFocus('code');
    }
  };
  // INSERT DATA IN REACT HOOK FORM
  useEffect(() => {
    if (typeOfPanel === 'Editar') {
      setValue('isActive', localByIdData.isActive || '');
      setValue('nombre', localByIdData.nombre || '');
      setValue('direccion', localByIdData.direccion || '');
      //setValue('direccion', localByIdData.category?.id || '');
      setValue('telefono', localByIdData.telefono || '');
      setValue('correo', localByIdData.correo || '');
      setValue('eslogan', localByIdData.eslogan || '');
      setValue('fecha_creacion', localByIdData.fecha_creacion || '');
      setValue('fecha_actualizacion', localByIdData.fecha_actualizacion || '');
      setValue('ciudad', localByIdData.ciudad || '');
      setValue('num_documento', localByIdData.num_documento || '');
      setValue('rz_social', localByIdData.rz_social || '');
      setValue('codDomicilioFiscal', localByIdData.codDomicilioFiscal || '');

      clearErrors();
      if (localByIdData.nombre) {
        setIsLoadingSelectItem(false);
      }
    }
  }, [localByIdData]);

  // LIMPIAR EDIT PANEL
  const clearInputs = () => {
    setIdLocal(-1);
    setValue('isActive', '');
    setValue('nombre', '');
    /* setValue('category', 'select');
    setCategoryId(0); */
    setValue('direccion', '');
    setValue('telefono', '');
    setValue('correo', '');
    setValue('eslogan', '');
    setValue('fecha_creacion', '');
    setValue('fecha_actualizacion', '');
    setValue('ciudad', '');
    setValue('num_documento', '');
    setValue('rz_social', '');
    setValue('codDomicilioFiscal', '');
    clearErrors();
  };

  // CANCEL EDIT PANEL
  const handleCancel = () => {
    setIdLocal(-1);
    setIsRowBlocked(false);
    setTypeOfPanel('Ingresar');
    clearInputs();
  };

  // CREATE ADMIN
  const createLocal = async (data) => {
    setIsLoaderSubmit(true);
    const dataToAdd = {
      isActive: data.isActive,
      nombre: data.nombre,
      direccion: data.direccion,
      telefono: data.telefono,
      correo: data.correo,
      eslogan: data.eslogan,
      fecha_creacion: data.fecha_creacion,
      fecha_actualizacion: data.fecha_actualizacion,
      ciudad: data.ciudad,
      num_documento: data.num_documento,
      rz_social: data.rz_social,
      codDomicilioFiscal: data.codDomicilioFiscal,
    };
    const [result, status] = await fetchLocal.post(dataToAdd);
    if (status !== 200) {
      errorAlert(result.message);
      setIsLoaderSubmit(false);
    } else {
      // await adminMutate();
      setIsLoaderSubmit(false);
      // await localByIdMutate();
      clearInputs();
      successAlert('Local Creado Correctamente');
    }
    // }
    //   else {
    //   setIsLoaderSubmit(false);
    // }
    await setLocalMutate(Date.now());
  };

  // EDIT ADMIN
  const editLocal = async (data) => {
    // console.log('editando');
    setIsLoaderSubmit(true);
    const dataToAdd = {
      isActive: data.isActive,
      nombre: data.nombre,
      direccion: data.direccion,
      telefono: data.telefono,
      correo: data.correo,
      eslogan: data.eslogan,
      fecha_creacion: data.fecha_creacion,
      fecha_actualizacion: data.fecha_actualizacion,
      ciudad: data.ciudad,
      num_documento: data.num_documento,
      rz_social: data.rz_social,
      codDomicilioFiscal: data.codDomicilioFiscal,
    };
    try {
      const [result, status] = await fetchLocal.put(idLocal, dataToAdd);
      if (status !== 200) {
        errorAlert(result.message);
        setIsLoaderSubmit(false);
      } else {
        // await adminMutate();
        await setIsLoaderSubmit(false);
        // await localByIdMutate();
        setTypeOfPanel('Ingresar');
        setIsRowBlocked(false);
        clearInputs();
        successAlert('Local Actualizado Correctamente');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLocalMutate(Date.now);
      scrollUp();
    }
  };

  /* const handleSelectCategory = (value) => {
    setValue('category', value);
  }; */

 // SUBMIT CREATE AND EDIT
 const onSubmit = async (data) => {
  if (typeOfPanel === 'Ingresar') {
    await createLocal(data);
  } else if (typeOfPanel === 'Editar') {
    await editLocal(data);
  }
};

// DELETE ADMIN
const handleDeleteLocal = async () => {
  setIsDeleteLoad(true);
  const id = idToDelete;
  try {
    const [result, status] = await fetchLocal.del(id);
    if (status !== 200) {
      errorAlert(result.message || 'Algo salió mal, intentelo nuevamente');
    } else {
      // await adminMutate();
      // await localByIdMutate();
      infoAlert('Eliminado Correctamente');
    }
  } catch (error) {
    errorAlert('Algo salió mal, intentelo nuevamente');
  } finally {
    await setLocalMutate(Date.now());
  }
  if (idLocal === id) {
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
                <p>el Local:</p>
                <p className="pb-2">{`${localData?.filter((item) => item.id === idToDelete)[0]?.nombre}?`}</p>
              </>
            )}
            titleFirstOption="   Cancelar   " // SPACES with alt + 0160
            titleSecondOption=" Eliminar "
            onClickFirstOption={() => { setIsOpenVerifyDelete(false); setIsDeleteLoad(false); }}
            onClickSecondOption={() => handleDeleteLocal()}
            isLoadSecondOption={isDeleteLoad}
            colorFirstButton="red-500"
          />
        </Portal>
      )}
    {/* {isOpenNewCategoryModal
      && (
        <Portal>
          <NewCategory
            setIsOpenNewCategoryModal={setIsOpenNewCategoryModal}
            setCategoryId={setCategoryId}
            setCategoryListMutate={setCategoryListMutate}
            setLocalMutate={setLocalMutate}
            handleSelectCategory={handleSelectCategory}
          />
        </Portal>
      )} */}
    <div className="flex flex-col items-center bg-bg-blue w-full min-h-screen box-border">
      <div className="pl-4 pt-2 flex w-full h-12 sm:h-16 bg-white shadow-sm">
        <div className="flex text-2xl sm:text-4xl text-gray-800 font-semibold">
          Tiendas
          <div className="text-red-500 opacity-80 w-7 sm:w-10 ml-1 mt-1">
            <IconLocal autosize />
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
                      setIsLoadingSearchLocal(true);
                      setTimeout(() => {
                        handleChangeSearch(e);
                      }, 1000);
                    }}
                  />
                  {searchShop === ''
                    ? (
                      <span className="absolute right-1 top-0 h-full w-7 text-center text-gray-600 flex items-center justify-center">
                        <IconSearch />
                      </span>
                    )
                    : isLoadingSearchLocal
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
            <div className="p-4 overflow-auto h-96">
              <table id="tableAdmin" className="table-auto text-center text-gray-700 w-full">
                <thead>
                  <tr className="border-l border-gray-400 bg-red-500 opacity-90 text-white">
                    <th className="border-r border-b border-gray-200 px-2 py-2 font-medium hidden">ID</th>
                    <th className="border-r border-b border-gray-200 px-2 py-2 font-medium text-sm">Nombre</th>
                    <th className="border-r border-b border-gray-200 px-6 py-2 font-medium whitespace-nowrap">Dirección</th>
                    <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">Razón Social</th>
                    {/* <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">
                      <div className="text-sm">
                        <p className="whitespace-nowrap">P. Compra</p>
                        <p className="text-xs">(S/)</p>
                      </div>
                    </th>
                    <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">
                      <div className="text-sm">
                        <p className="whitespace-nowrap">P. Sugerido</p>
                        <p className="text-xs">(S/)</p>
                      </div>
                    </th>
                    <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">Stock</th> */}
                    {/* <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">Estado</th> */}
                    <th className="border-b border-gray-200 px-2 py-2 font-medium">Editar</th>
                    <th className="border-l border-gray-400 bg-white select-none">0</th>
                  </tr>
                </thead>
                {Array.isArray(localData) && localData[0] !== 'loading'
                  && (
                    <tbody>
                      {localData.map((item) => (
                        <tr key={item.id} onClick={() => !isRowBlocked && setRowSelected(item.id)} className={`text-sm rowTable ${rowSelected === item.id && 'rowTableAdminSelected'}`}>
                          <td className="border border-gray-350 px-2 py-2 font-medium hidden">{item.id}</td>
                          <td className="border border-gray-350 px-2 py-2 font-medium whitespace-nowrap">{item.nombre || ''}</td>
                          <td className="border border-gray-350 px-2 py-2 font-medium capitalize text-left">{item.direccion || ''}</td>
                          <td className="border border-gray-350 px-2 py-2 font-medium capitalize text-left">{item.rz_social || ''}</td>
                          {/* <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.category?.rz_social || ''}</td> */}
                          {/* <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.precio_compra || ''}</td>
                          <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.precio_sugerido || ''}</td>
                          <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.stock}</td> */}
                          {/* <td className="border border-gray-350 px-2 py-2 font-medium capitalize">Activo</td> */}
                          <td className="border border-gray-350 px-2 py-2 font-medium">
                            <div className="flex justify-center space-x-2">
                              <ButtonIcon
                                icon={<IconPencil />}
                                isBorder
                                isBgColor
                                colorBg="primary"
                                onClick={() => {
                                  handleEditLocal(item.id);
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
                {localData[0] === 'loading'
                  ? (
                    <div className="flex items-center justify-center py-8">
                      <IconSpiner dark medium />
                    </div>
                  )
                  : localData.length === 0 || !Array.isArray(localData)
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
              Tienda
            </div>
            <div className="flex flex-col w-full pt-3 p-4">

              {isLoaderSubmit ? (
                <div className="flex flex-col items-center w-full h-full">
                  <IconSpiner dark big />
                  Guardando...
                </div>
              )
                : (
                  <form className="flex flex-col w-full -mt-2 relative" onSubmit={handleSubmit(onSubmit)}>
                    <FormTextInput inputName="nombre"
                      title="Nombre"
                      icon={<IconProductCode />}
                      placeholder="Ingresar Nombre"
                      options={{
                        required: {
                          value: true,
                          message: 'Nombre requerido',
                        },
                        /* pattern: {
                          value: /^[a-zA-Z0-9-ñÑ]+$/,
                          message: 'Nombre invalido',
                        }, */
                      }}
                      register={register} errors={errors}
                    />
                    <FormTextInput inputName="direccion"
                      title="Dirección"
                      icon={<IconGPS />}
                      placeholder="Ingresar Dirección"
                      options={{
                        required: {
                          value: true,
                          message: 'Dirección requerida',
                        },
                      }}
                      register={register} errors={errors}
                    />
                    {/* <div className="flex space-x-3 items-end">
                      <FormSelectInput inputName="category"
                        title="Categoria"
                        icon={<IconCategory />}
                        placeholder="Seleccionar Categoria"
                        // onChange={(e) => handleChangeCantView(e)}
                        options={{
                          validate: {
                            value: (e) => e !== 'select' || 'Categoria requerida',
                          },
                        }}
                        register={register} errors={errors} watch={watch}
                      >
                        {Array.isArray(categoriesData)
                          && categoriesData.map((item) => (
                            <option key={item.id} value={item.id} selected={categoryId === item.id} className="capitalize text-gray-700">
                              {item.descripcion}
                            </option>
                          ))}
                      </FormSelectInput>
                      <button type="button"
                        onClick={() => setIsOpenNewCategoryModal(true)}
                        className={`flex items-center justify-center w-10 h-8.5 px-1 rounded-xl text-white text-sm sm:text-base bg-primary opacity-90 hover:opacity-100 
                          ${errors?.category ? 'mb-4' : ''}`}
                      >
                        <div className="">
                          <IconNewCategory />
                        </div>
                      </button>
                    </div> */}
                    <FormTextInput inputName="telefono"
                      title="Teléfono"
                      icon={<IconPhone />}
                      placeholder="Ingresar Teléfono"
                      options={{
                        required: {
                          value: true,
                          message: 'Teléfono requerido',
                        },
                        pattern: {
                          value: /^[0-9.]+$/,
                          message: 'Teléfono invalido',
                        },
                        /* min: {
                          value: 0.01,
                          message: 'Precio debe ser mayor a 0',
                        }, */
                        onBlur: () => watch('telefono') * 2 && setValue('telefono', parseFloat(watch('telefono')).toFixed(2)),
                      }}
                      register={register} errors={errors}
                    />

                    <FormTextInput inputName="correo"
                      title="Correo Electrónico"
                      icon={<IconEmail />}
                      placeholder="Ingresar Correo Electrónico"
                      options={{
                        required: {
                          value: true,
                          message: 'Correo Electrónico requerido',
                        },
                       /*  pattern: {
                          value: /^[0-9.]+$/,
                          message: 'Correo Electrónico invalido',
                        }, */
                        /* min: {
                          value: 0.01,
                          message: 'Precio debe ser mayor a 0',
                        }, */
                        onBlur: () => watch('correo') * 2 && setValue('correo', parseFloat(watch('correo')).toFixed(2)),
                      }}
                      register={register} errors={errors}
                    />
                    {/* <FormTextInput inputName="slogan"
                      title="Eslogan"
                      icon={<IconLocal />}
                      placeholder="Ingresar Eslogan"
                      options={{
                        required: {
                          value: true,
                          message: 'Eslogan requerida',
                        },
                      }}
                      register={register} errors={errors}
                    />
                    <FormTextInput inputName="fecha_creacion"
                      title="Fecha de Creación"
                      icon={<IconLocal />}
                      placeholder="Ingresar Fecha de Creación"
                      options={{
                        required: {
                          value: true,
                          message: 'Fecha de Creación requerida',
                        },
                      }}
                      register={register} errors={errors}
                    />
                     <FormTextInput inputName="fecha_actualizacion"
                      title="Fecha de Actualización"
                      icon={<IconLocal />}
                      placeholder="Ingresar Fecha de Actualización"
                      options={{
                        required: {
                          value: true,
                          message: 'Fecha de Actualización requerida',
                        },
                      }}
                      register={register} errors={errors}
                    /> */}
                    <FormTextInput inputName="ciudad"
                      title="Ciudad"
                      icon={<IconLocal />}
                      placeholder="Ingresar Ciudad"
                      options={{
                        required: {
                          value: true,
                          message: 'Ciudad requerida',
                        },
                      }}
                      register={register} errors={errors}
                    />
                    <FormTextInput inputName="num_documento"
                      title="RUC"
                      icon={<IconIdCard />}
                      placeholder="Ingresar RUC"
                      options={{
                        required: {
                          value: true,
                          message: 'RUC requerida',
                        },
                      }}
                      register={register} errors={errors}
                    />
                    <FormTextInput inputName="rz_social"
                      title="Razón Social"
                      icon={<IconObservation />}
                      placeholder="Ingresar Razón Social"
                      options={{
                        required: {
                          value: true,
                          message: 'Razón Social requerida',
                        },
                      }}
                      register={register} errors={errors}
                    />
                    {/* <FormTextInput inputName="codDomicilioFiscal"
                      title="Código Fiscal"
                      icon={<IconLocal />}
                      placeholder="Ingresar Código Fiscal"
                      options={{
                        required: {
                          value: true,
                          message: 'Código Fiscal requerida',
                        },
                      }}
                      register={register} errors={errors}
                    /> */}
                    {/* <FormTextInput inputName="stock"
                      title="Stock"
                      icon={<IconStock />}
                      placeholder="Ingresar Stock"
                      options={{
                        required: {
                          value: true,
                          message: 'Stock requerido',
                        },
                        pattern: {
                          value: /^[0-9]+$/,
                          message: 'Stock invalido',
                        },
                      }}
                      register={register} errors={errors}
                    /> */}
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
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
};
Local.propTypes = {
  isLoadingSearchLocal: PropTypes.bool.isRequired,
  setIsLoadingSearchLocal: PropTypes.func.isRequired,
  localData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape()),
  ]).isRequired,
  setLocalMutate: PropTypes.func.isRequired,
  categoriesData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape()),
  ]).isRequired,
  setLimit: PropTypes.func.isRequired,
  setSearchLocal: PropTypes.func.isRequired,
  searchShop: PropTypes.string.isRequired,
  idLocal: PropTypes.number.isRequired,
  setIdLocal: PropTypes.func.isRequired,
  localByIdData: PropTypes.oneOfType([
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

export default withFetch(Local);